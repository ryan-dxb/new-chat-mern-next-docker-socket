import asyncHandler from "express-async-handler";
import { RequestHandler, Request, Response, NextFunction } from "express";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { findUserById } from "@/services/auth.service";
import UserModel, { UserDocument } from "@/models/userModel";
import { UserObj } from "@/services/user.service";

const getAllFriendRequestsController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      // Get User and then populate the friends array
      let userFound;

      userFound = await user.populate("pendingFriendInvitations");
      userFound = await user.populate("pendingFriendSentRequests");

      // Populate the requests received
      userFound = await UserModel.populate(userFound, {
        path: "pendingFriendInvitations",
        populate: {
          path: "sender",
          select: "email username status avatar firstName lastName",
        },
      });

      // Populate the requests sent
      userFound = await UserModel.populate(userFound, {
        path: "pendingFriendSentRequests",
        populate: {
          path: "receiver",
          select: "email username status avatar firstName lastName",
        },
      });

      // Only return the necessary fields
      const friendRequestsSent = userFound.pendingFriendSentRequests.map(
        (friend: { _id: string; receiver: UserObj }) => {
          return {
            request_id: friend._id,
            userDetails: friend.receiver,
          };
        }
      );

      const friendRequestsReceived = userFound.pendingFriendInvitations.map(
        (friend: { _id: string; sender: UserObj }) => {
          return {
            request_id: friend._id,
            userDetails: friend.sender,
          };
        }
      );

      // Get the friend requests sent
      res.json({
        friendRequestsSent: friendRequestsSent,
        friendRequestsReceived: friendRequestsReceived,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default getAllFriendRequestsController;
