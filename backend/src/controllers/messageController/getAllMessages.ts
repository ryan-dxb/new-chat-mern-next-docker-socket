import asyncHandler from "express-async-handler";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { GetAllMessagesRequest } from "@/@types/messages";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import MessageModel from "@/models/messageModel";
import ConversationModel from "@/models/conversationModel";

export const getAllMessagesController = asyncHandler(
  async (req: GetAllMessagesRequest, res: Response, next: NextFunction) => {
    try {
      const { conversation_id } = req.params;
      const user = req.user;

      if (!conversation_id) {
        return sendError(
          createHttpError.BadRequest("Please provide a conversation id")
        );
      }

      // Check if conversation exists
      const conversationExists = await ConversationModel.findById(
        conversation_id
      );

      if (!conversationExists) {
        return sendError(
          createHttpError.NotFound("Conversation does not exist")
        );
      }

      // Check if user is in the conversation
      const isUserInConversation = conversationExists.users.includes(
        user._id.toString()
      );

      if (!isUserInConversation) {
        return sendError(
          createHttpError.BadRequest(
            "You are not in the conversation you are trying to fetch"
          )
        );
      }

      // Fetch messages
      const messages = await MessageModel.find({
        conversation: conversation_id,
      }).populate("sender", "firstName lastName username avatar email status");
      // .sort({ createdAt: -1 });

      const messageObject = messages.map((message) => {
        return {
          message_id: message._id,
          message: message.message,
          sender: message.sender,
          files: message.files,
          createdAt: message.createdAt,
        };
      });

      res.status(200).json({
        message: "Messages fetched",
        data: {
          messages: messageObject,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default getAllMessagesController;
