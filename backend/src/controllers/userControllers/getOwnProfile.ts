import asyncHandler from "express-async-handler";
import { RequestHandler, Request, Response } from "express";
import { findUserById } from "@/services/auth.service";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import UserModel, { UserDocument } from "@/models/userModel";
import FriendInvitationModel from "@/models/friendInvitationModel";

const getOwnProfileController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next) => {
    try {
      const user = req.user;

      let userProfile = await UserModel.findById(user._id)
        .populate("friends", "username firstName lastName avatar status")
        .populate("pendingFriendInvitations", "sender  ")
        .populate("pendingFriendSentRequests", " receiver ");

      if (!userProfile) {
        sendError(createHttpError.NotFound("User not found"));
      }

      if (userProfile.pendingFriendInvitations.length > 0) {
        userProfile = await FriendInvitationModel.populate(userProfile, {
          path: "pendingFriendInvitations.sender",
          select: "username firstName lastName avatar status",
        });
      }

      if (userProfile.pendingFriendSentRequests.length > 0) {
        userProfile = await FriendInvitationModel.populate(userProfile, {
          path: "pendingFriendSentRequests.receiver",
          select: "username firstName lastName avatar status",
        });
      }

      res.status(200).json({
        message: "User profile",
        data: {
          user: {
            id: userProfile._id,
            email: userProfile.email,
            isAccountActive: userProfile.isAccountActive,
            isEmailVerified: userProfile.isEmailVerified,
            username: userProfile.username,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            avatar: userProfile.avatar,
            status: userProfile.status,
            friends: userProfile.friends,
            pendingFriendInvitations: userProfile.pendingFriendInvitations,
            pendingFriendSentRequests: userProfile.pendingFriendSentRequests,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default getOwnProfileController;
