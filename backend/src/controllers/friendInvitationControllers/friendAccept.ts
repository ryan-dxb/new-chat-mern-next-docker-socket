import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction } from "express";
import {
  FriendAcceptRequest,
  FriendInviteRequest,
} from "@/@types/friendInvite";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { UserDocument } from "@/models/userModel";
import { findUserById } from "@/services/auth.service";
import FriendInvitationModel from "@/models/friendInvitationModel";

const friendAcceptController: RequestHandler = asyncHandler(
  async (req: FriendAcceptRequest, res: Response, next: NextFunction) => {
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

      // Check if the user is trying to accept a friend request that was sent to him
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

      // Add the user to the friends array
      userFound.friends.push(requestFound.sender);

      // Get the receiver from database
      const receiverFound: UserDocument = await findUserById(
        requestFound.sender.toString()
      );

      if (!receiverFound) {
        return sendError(
          createHttpError.NotFound(
            "Something went wrong. Please try again later"
          )
        );
      }

      // Check if the receiver has the friend request in his pendingFriendSentRequests array
      const friendRequestFoundInReceiver =
        receiverFound.pendingFriendSentRequests.find(
          (friendRequestId) => friendRequestId.toString() === request_id
        );

      if (!friendRequestFoundInReceiver) {
        return sendError(
          createHttpError.NotFound(
            "Something went wrong. Please try again later"
          )
        );
      }

      // Remove the friend request from the receiver's pendingFriendSentRequests array
      receiverFound.pendingFriendSentRequests =
        receiverFound.pendingFriendSentRequests.filter(
          (friendRequestId) => friendRequestId.toString() !== request_id
        );

      // Add the receiver to the friends array
      receiverFound.friends.push(userFound._id);

      // Save the user and the receiver
      await userFound.save();
      await receiverFound.save();

      // Delete the friend request from database
      await FriendInvitationModel.findByIdAndDelete(request_id);

      res.status(200).json({
        message: "Friend request accepted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default friendAcceptController;
