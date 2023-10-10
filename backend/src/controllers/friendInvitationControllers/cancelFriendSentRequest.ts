import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction } from "express";
import { CancelInviteRequest } from "@/@types/friendInvite";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { findUserByEmail, findUserById } from "@/services/auth.service";
import { UserDocument } from "@/models/userModel";
import FriendInvitationModel from "@/models/friendInvitationModel";

const cancelFriendSentRequestController: RequestHandler = asyncHandler(
  async (req: CancelInviteRequest, res: Response, next: NextFunction) => {
    try {
      const { request_id, receiver_email } = req.body;
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

      // Check if the user is trying to cancel a friend request that he sent
      const friendRequestFound = userFound.pendingFriendSentRequests.find(
        (friendRequestId) => friendRequestId.toString() === request_id
      );

      if (!friendRequestFound) {
        return sendError(
          createHttpError.NotFound(
            "Friend request not found or already canceled"
          )
        );
      }

      // Remove the friend request from the user's pendingFriendSentRequests array
      userFound.pendingFriendSentRequests =
        userFound.pendingFriendSentRequests.filter(
          (friendRequestId) => friendRequestId.toString() !== request_id
        );

      // Get the receiver from database
      const receiverFound: UserDocument = await findUserByEmail(receiver_email);

      if (!receiverFound) {
        return sendError(
          createHttpError.NotFound(
            "Something went wrong. Please try again later"
          )
        );
      }

      // Check if the receiver has the friend request in his pendingFriendInvitations array
      const friendRequestFoundInReceiver =
        receiverFound.pendingFriendInvitations.find(
          (friendRequestId) => friendRequestId.toString() === request_id
        );

      if (!friendRequestFoundInReceiver) {
        return sendError(
          createHttpError.NotFound(
            "Something went wrong. Please try again later"
          )
        );
      }

      // Remove the friend request from the receiver's pendingFriendInvitations array
      receiverFound.pendingFriendInvitations =
        receiverFound.pendingFriendInvitations.filter(
          (friendRequestId) => friendRequestId.toString() !== request_id
        );

      // Save the receiver
      await receiverFound.save();
      // Save the user
      await userFound.save();

      // Delete the friend request from database
      await FriendInvitationModel.findByIdAndDelete(request_id);

      res.status(200).json({
        message: "Friend request canceled successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default cancelFriendSentRequestController;
