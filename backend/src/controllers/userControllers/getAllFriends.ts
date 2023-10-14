import asyncHandler from "express-async-handler";
import { Request, RequestHandler, Response, NextFunction } from "express";
import { findUserById } from "@/services/auth.service";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import UserModel, { UserDocument } from "@/models/userModel";
import { UserObj } from "@/services/user.service";

const getAllFriendsController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      // Populate the friends array with the user details
      let newUserFound = await UserModel.populate(user, {
        path: "friends",
        select: "email username status avatar firstName lastName",
      });

      // Only return the necessary fields
      const friendObj = newUserFound.friends.map(
        (friend: { _id: string; friend: UserObj }) => {
          return {
            friend_id: friend._id,
            userDetails: friend,
          };
        }
      );

      res.status(200).json({
        message: "All Friends",
        data: friendObj,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default getAllFriendsController;
