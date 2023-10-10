import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction } from "express";
import { DeleteFriendRequest } from "@/@types/friendInvite";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { UserDocument } from "@/models/userModel";
import { findUserById } from "@/services/auth.service";

const deleteFriendController: RequestHandler = asyncHandler(
  async (req: DeleteFriendRequest, res: Response, next: NextFunction) => {
    try {
      const { friend_id } = req.body;
      const { _id, email } = req.user;

      if (!friend_id) {
        return sendError(createHttpError.BadRequest("Friend ID is required"));
      }

      // Get User from database
      const userFound: UserDocument = await findUserById(_id);

      if (!userFound) {
        return sendError(createHttpError.NotFound("User not found"));
      }

      // Check if the user is trying to delete a friend that he has
      const friendFound = userFound.friends.find(
        (friendId) => friendId.toString() === friend_id
      );

      if (!friendFound) {
        return sendError(
          createHttpError.NotFound("Friend not found or already deleted")
        );
      }

      // Remove the friend from the user's friends array
      userFound.friends = userFound.friends.filter(
        (friendId) => friendId.toString() !== friend_id
      );

      // Get the friend from database
      const friendFoundInDatabase: UserDocument = await findUserById(friend_id);

      if (!friendFoundInDatabase) {
        return sendError(
          createHttpError.NotFound(
            "Something went wrong. Please try again later"
          )
        );
      }

      // Remove the user from the friend's friends array
      friendFoundInDatabase.friends = friendFoundInDatabase.friends.filter(
        (friendId) => friendId.toString() !== userFound._id.toString()
      );

      await userFound.save();
      await friendFoundInDatabase.save();

      res.status(200).json({
        message: "Friend deleted",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default deleteFriendController;
