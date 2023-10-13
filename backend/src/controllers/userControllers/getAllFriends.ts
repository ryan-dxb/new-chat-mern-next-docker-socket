import asyncHandler from "express-async-handler";
import { Request, RequestHandler, Response, NextFunction } from "express";
import { findUserById } from "@/services/auth.service";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import UserModel, { UserDocument } from "@/models/userModel";

const getAllFriendsController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const userFound: UserDocument = await findUserById(user._id);

      if (!userFound) {
        return sendError(createHttpError.NotFound("User Not Found"));
      }

      // Populate the friends array with the user details

      let newUserFound = await UserModel.populate(userFound, {
        path: "friends",
        select: "email username status avatar firstName lastName",
      });

      // Only return the necessary fields
      const friendObj = newUserFound.friends.map(
        (friend: {
          _id: string;
          email: string;
          username: string;
          status: string;
          avatar: string;
          firstName: string;
          lastName: string;
        }) => {
          return {
            friend_id: friend._id,
            email: friend.email,
            username: friend.username,
            status: friend.status,
            avatar: friend.avatar,
            firstName: friend.firstName,
            lastName: friend.lastName,
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
