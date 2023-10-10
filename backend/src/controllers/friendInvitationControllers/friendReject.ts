import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction } from "express";
import {
  FriendInviteRequest,
  FriendRejectRequest,
} from "@/@types/friendInvite";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { UserDocument } from "@/models/userModel";
import { findUserById } from "@/services/auth.service";
import FriendInvitationModel from "@/models/friendInvitationModel";

const friendRejectController: RequestHandler = asyncHandler(
  async (req: FriendRejectRequest, res: Response, next: NextFunction) => {
    try {
      const { request_id } = req.body;
      const { _id, email } = req.user;

      if (!request_id) {
        return sendError(
          createHttpError.BadRequest("Friend Request ID is required")
        );
      }

      // Get User from database
      const userFound: UserDocument = await findUserById(_id);

      if (!userFound) {
        return sendError(createHttpError.NotFound("User not found"));
      }

      // Get the friend request from database
      const requestFound = await FriendInvitationModel.findById(request_id);

      if (!requestFound) {
        return sendError(
          createHttpError.NotFound(
            "Friend request not found or already canceled"
          )
        );
      }

      // Check if the user is trying to reject a friend request that was sent to him
      const friendRequestFound = userFound.pendingFriendInvitations.find(
        (friendRequestId) => friendRequestId.toString() === request_id
      );

      if (!friendRequestFound) {
        return sendError(
          createHttpError.NotFound(
            "Friend request not found or already canceled"
          )
        );
      }

      // Remove the friend request from the user's pendingFriendInvitations array
      userFound.pendingFriendInvitations =
        userFound.pendingFriendInvitations.filter(
          (friendRequestId) => friendRequestId.toString() !== request_id
        );

      // Get the sender from database
      const senderFound: UserDocument = await findUserById(
        requestFound.sender.toString()
      );

      if (!senderFound) {
        return sendError(
          createHttpError.NotFound(
            "Something went wrong. Please try again later"
          )
        );
      }

      // Check if the sender has the friend request in his pendingFriendSentRequests array
      const friendRequestFoundInSender =
        senderFound.pendingFriendSentRequests.find(
          (friendRequestId) => friendRequestId.toString() === request_id
        );

      if (!friendRequestFoundInSender) {
        return sendError(
          createHttpError.NotFound(
            "Something went wrong. Please try again later"
          )
        );
      }

      // Remove the friend request from the sender's pendingFriendSentRequests array
      senderFound.pendingFriendSentRequests =
        senderFound.pendingFriendSentRequests.filter(
          (friendRequestId) => friendRequestId.toString() !== request_id
        );

      // Save the changes to the database
      await userFound.save();
      await senderFound.save();

      // Delete the friend request from the database
      await FriendInvitationModel.findByIdAndDelete(request_id);

      res.status(200).json({
        message: "Friend request rejected successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default friendRejectController;
