import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction } from "express";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import UserModel from "@/models/userModel";
import { findUserById } from "@/services/auth.service";
import ConversationModel from "@/models/conversationModel";

const createGroupConversationController: RequestHandler = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { friend_ids, groupName } = req.body;
      const userId = req.user._id;

      // Check if group name is empty
      if (!groupName || groupName.trim() === "") {
        return sendError(
          createHttpError.BadRequest("Group name cannot be empty")
        );
      }

      // Check if friend_ids is empty or if its not an array or length less than 2
      if (!friend_ids || !Array.isArray(friend_ids) || friend_ids.length < 2) {
        return sendError(
          createHttpError.BadRequest("Please select at least 2 friends")
        );
      }

      // Check if friend_ids contains userId
      if (friend_ids.includes(userId.toString())) {
        return sendError(
          createHttpError.BadRequest("You cannot add yourself to group")
        );
      }

      // Check if friend_ids contains duplicate
      if (new Set(friend_ids).size !== friend_ids.length) {
        return sendError(
          createHttpError.BadRequest("Duplicate friends in group")
        );
      }

      // Check if friend_ids are valid
      const friends = await UserModel.find({
        _id: { $in: friend_ids },
      });
      if (friends.length !== friend_ids.length) {
        return sendError(createHttpError.BadRequest("Invalid friend_ids"));
      }

      const userFound = await findUserById(userId);

      if (!userFound) {
        return sendError(createHttpError.NotFound("User not found"));
      }

      // Check if friends are in user's friend list
      const isValidFriends = friends.every((friend) =>
        userFound.friends.includes(friend._id)
      );

      if (!isValidFriends) {
        return sendError(
          createHttpError.BadRequest("You can only add your friends to group")
        );
      }

      // Create group conversation
      const newGroupConversation = await ConversationModel.create({
        isGroup: true,
        name: groupName,
        groupAdmin: userFound._id,
        users: [...friend_ids, userFound._id],
      });

      const populatedGroupConversation = await ConversationModel.findById(
        newGroupConversation._id
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      res.status(200).json({
        message: "Group conversation created successfully",
        data: populatedGroupConversation,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default createGroupConversationController;
