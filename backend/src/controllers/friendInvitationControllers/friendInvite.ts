import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction } from "express";
import { FriendInviteRequest } from "@/@types/friendInvite";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import UserModel, { UserDocument } from "@/models/userModel";
import { findUserByEmail, findUserById } from "@/services/auth.service";
import FriendInvitationModel from "@/models/friendInvitationModel";
import { createUserObjWithoutPassword } from "@/services/user.service";

const friendInviteController: RequestHandler = asyncHandler(
  async (req: FriendInviteRequest, res: Response, next: NextFunction) => {
    try {
      const { receiver_email } = req.body;
      const user = req.user;

      if (!receiver_email) {
        return sendError(
          createHttpError.BadRequest("Receiver email is required")
        );
      }

      // Get the receiver from database
      const receiverFound = await findUserByEmail(receiver_email.toLowerCase());

      if (!receiverFound) {
        return sendError(
          createHttpError.NotFound(
            "User you are trying to send a friend request to not found"
          )
        );
      }

      // Check if the user is trying to send a friend request to himself
      if (user.email.toLowerCase() === receiver_email.toLowerCase()) {
        return sendError(
          createHttpError.BadRequest(
            "You cannot send a friend request to yourself"
          )
        );
      }

      // Check if the user is trying to send a friend request to someone who is already his friend
      const userAlreadyFriend = user.friends.find(
        (friendId) => friendId.toString() === receiverFound._id.toString()
      );

      if (userAlreadyFriend) {
        return sendError(
          createHttpError.BadRequest(
            "You are already friend with the user you are trying to send a friend request to"
          )
        );
      }

      // Check if the user is trying to send a friend request to someone who already sent him a friend request or if he already sent a friend request to him
      const invitationAlreadySentOrRecieved =
        await FriendInvitationModel.findOne({
          $or: [
            {
              sender: user._id,
              receiver: receiverFound._id,
            },
            {
              sender: receiverFound._id,
              receiver: user._id,
            },
          ],
        });

      if (invitationAlreadySentOrRecieved) {
        return sendError(
          createHttpError.BadRequest(
            "You already sent a friend request to this user or receiver already sent you one"
          )
        );
      }

      // Create the friend invitation
      let newFriendInvitation = await FriendInvitationModel.create({
        sender: user._id,
        receiver: receiverFound._id,
      });

      // Add the friend invitation to the sender's pendingFriendSentRequests
      // and to the receiver's pendingFriendInvitations

      user.pendingFriendSentRequests.push(newFriendInvitation._id);
      receiverFound.pendingFriendInvitations.push(newFriendInvitation._id);

      await user.save();
      await receiverFound.save();

      // Send Socket.io notification to the receiver

      // Create new invitation object without password

      // Send Response

      let newFriendInvitationObj = await UserModel.populate(
        newFriendInvitation,
        {
          path: "receiver",
          select: "email username status avatar firstName lastName",
        }
      );

      // Create a new invitation object without password

      res.status(201).json({
        message: "Friend invitation sent successfully",
        data: {
          request_id: newFriendInvitation._id,
          userDetails: newFriendInvitationObj.receiver,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default friendInviteController;
