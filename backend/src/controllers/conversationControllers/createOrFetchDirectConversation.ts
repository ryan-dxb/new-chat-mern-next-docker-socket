import asyncHandler from "express-async-handler";
import { Response, NextFunction, RequestHandler } from "express";
import ConversationModel from "@/models/conversationModel";
import UserModel, { UserDocument } from "@/models/userModel";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { findUserById } from "@/services/auth.service";
import { log } from "console";

const createOrFetchDirectConversationController: RequestHandler = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const { friend_id } = req.body;
      const userId = req.user._id;

      console.log("friend_id", friend_id);
      log("userId", userId);

      if (!friend_id) {
        return sendError(createHttpError.BadRequest("friend_id is required"));
      }

      if (friend_id === userId.toString()) {
        return sendError(
          createHttpError.BadRequest("You cannot message yourself")
        );
      }

      // Check if friend exists
      const friendFound = await findUserById(friend_id);

      if (!friendFound) {
        return sendError(
          createHttpError.NotFound(
            "User you are trying to message does not exist"
          )
        );
      }

      const userFound: UserDocument = await findUserById(userId.toString());

      if (!userFound) {
        return sendError(
          createHttpError.NotFound(
            "User you are trying to message does not exist"
          )
        );
      }

      // Check if use has friend_id in their friends list
      const isFriend = userFound.friends.includes(friend_id);

      if (!isFriend) {
        return sendError(
          createHttpError.BadRequest(
            "You cannot message someone who is not your friend"
          )
        );
      }

      // Check if user is already in a conversation with the friend
      // Check if conversation already exists
      let isConversationExists = await ConversationModel.find({
        isGroup: false,
        $and: [
          { users: { $elemMatch: { $eq: userId } } },
          { users: { $elemMatch: { $eq: friend_id } } },
        ],
      })
        .populate("users", "-password, -refreshToken")
        .populate("latestMessage");

      if (isConversationExists.length > 0) {
        // Conversation already exists
        // Populate the conversation with the latest message

        isConversationExists = await UserModel.populate(isConversationExists, {
          path: "latestMessage.sender",
          select: "-password -refreshToken",
        });

        res.status(200).json({
          message: "Conversation Found",
          data: isConversationExists[0],
        });
      } else {
        // Conversation does not exist
        // Create a new conversation
        const newConversation = await ConversationModel.create({
          isGroup: false,
          users: [userId, friend_id],
        });

        // Populate the conversation with the users
        const populatedConversation = await ConversationModel.populate(
          newConversation,
          {
            path: "users",
            select: "-password -refreshToken",
          }
        );

        res.status(201).json({
          message: "Conversation Created",
          data: populatedConversation,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

export default createOrFetchDirectConversationController;
