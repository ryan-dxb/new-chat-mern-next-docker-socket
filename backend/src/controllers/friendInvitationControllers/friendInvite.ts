import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction } from "express";
import { FriendInviteRequest } from "@/@types/friendInvite";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { UserDocument } from "@/models/userModel";
import { findUserByEmail, findUserById } from "@/services/auth.service";
import FriendInvitationModel from "@/models/friendInvitationModel";
import { createUserObjWithoutPassword } from "@/services/user.service";

const friendInviteController: RequestHandler = asyncHandler(
  async (req: FriendInviteRequest, res: Response, next: NextFunction) => {
    try {
      const { receiver_email } = req.body;

      const { _id, email } = req.user;

      if (!receiver_email) {
        return sendError(
          createHttpError.BadRequest("Receiver email is required")
        );
      }

      // Get User from database
      const userFound: UserDocument = await findUserById(_id);

      if (!userFound) {
        return sendError(createHttpError.NotFound("User not found"));
      }

      // Get the receiver from database
      const receiverFound: UserDocument = await findUserByEmail(receiver_email);

      if (!receiverFound) {
        return sendError(
          createHttpError.NotFound(
            "User you are trying to send a friend request to not found"
          )
        );
      }

      // Check if the user is trying to send a friend request to himself
      if (email === receiver_email) {
        return sendError(
          createHttpError.BadRequest(
            "You cannot send a friend request to yourself"
          )
        );
      }

      // Check if the user is trying to send a friend request to someone who is already his friend
      const userAlreadyFriend = userFound.friends.find(
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
              sender: userFound._id,
              receiver: receiverFound._id,
            },
            {
              sender: receiverFound._id,
              receiver: userFound._id,
            },
          ],
        });

      if (invitationAlreadySentOrRecieved) {
        return sendError(
          createHttpError.BadRequest(
            "You already sent a friend request to this user or he already sent you one"
          )
        );
      }

      // Create the friend invitation
      const newFriendInvitation = await FriendInvitationModel.create({
        sender: userFound._id,
        receiver: receiverFound._id,
      });

      // Add the friend invitation to the sender's pendingFriendSentRequests
      // and to the receiver's pendingFriendInvitations

      userFound.pendingFriendSentRequests.push(newFriendInvitation._id);
      receiverFound.pendingFriendInvitations.push(newFriendInvitation._id);

      await userFound.save();
      await receiverFound.save();

      // Send Socket.io notification to the receiver

      const userObj = createUserObjWithoutPassword(userFound);

      // Send Response
      res.status(201).json({
        message: "Friend invitation sent successfully",
        data: {
          user: userObj,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default friendInviteController;
