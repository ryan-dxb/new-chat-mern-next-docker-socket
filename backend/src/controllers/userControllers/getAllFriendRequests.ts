import asyncHandler from "express-async-handler";
import { RequestHandler, Request, Response, NextFunction } from "express";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { findUserById } from "@/services/auth.service";
import UserModel, { UserDocument } from "@/models/userModel";

const getAllFriendRequestsController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return sendError(createHttpError.NotFound("User Not found"));
      }

      // Get User and then populate the friends array
      let userFound = await UserModel.findById(user._id)
        .populate("pendingFriendInvitations")
        .populate("pendingFriendSentRequests");

      if (!userFound) {
        return sendError(createHttpError.NotFound("User Not found"));
      }

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
        (friend: {
          receiver: {
            email: string;
            username: string;
            status: string;
            avatar: string;
            firstName: string;
            lastName: string;
          };
        }) => friend.receiver
      );
      const friendRequestsReceived = userFound.pendingFriendInvitations.map(
        (friend: {
          sender: {
            email: string;
            username: string;
            status: string;
            avatar: string;
            firstName: string;
            lastName: string;
          };
        }) => friend.sender
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
