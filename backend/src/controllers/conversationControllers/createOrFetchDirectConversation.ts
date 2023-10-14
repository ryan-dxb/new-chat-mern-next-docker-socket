import asyncHandler from "express-async-handler";
import { Response, NextFunction, RequestHandler, Request } from "express";
import ConversationModel from "@/models/conversationModel";
import UserModel, { UserDocument } from "@/models/userModel";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { findUserById } from "@/services/auth.service";
import { log } from "console";

const createOrFetchDirectConversationController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { friend_id } = req.body;
      const user = req.user;

      if (!friend_id) {
        return sendError(createHttpError.BadRequest("Friend ID is required"));
      }

      if (friend_id === user._id.toString()) {
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

      // Check if use has friend_id in their friends list
      const isFriend = user.friends.includes(friend_id);

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
          { users: { $elemMatch: { $eq: user._id } } },
          { users: { $elemMatch: { $eq: friend_id } } },
        ],
      })
        .populate("users", "name email username firstName lastName avatar")
        .populate("latestMessage");

      if (isConversationExists.length > 0) {
        // Conversation already exists
        // Populate the conversation with the latest message

        isConversationExists = await UserModel.populate(isConversationExists, {
          path: "latestMessage.sender",
          select: "name email username firstName lastName avatar",
        });

        console.log(isConversationExists[0]);

        res.status(200).json({
          message: "Conversation Found",
          data: isConversationExists[0],
        });
      } else {
        // Conversation does not exist
        // Create a new conversation
        const newConversation = await ConversationModel.create({
          isGroup: false,
          users: [user._id, friend_id],
        });

        // Populate the conversation with the users
        const populatedConversation = await ConversationModel.populate(
          newConversation,
          {
            path: "users",
            select: "name email username firstName lastName avatar",
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
