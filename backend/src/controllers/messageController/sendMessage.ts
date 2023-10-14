import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction } from "express";
import { SendMessagesRequest } from "@/@types/messages";
import ConversationModel from "@/models/conversationModel";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import MessageModel from "@/models/messageModel";
import UserModel from "@/models/userModel";

export const sendMessageController: RequestHandler = asyncHandler(
  async (req: SendMessagesRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const { conversation_id, message } = req.body;

      // Check if conversation exists
      const conversation = await ConversationModel.findById(conversation_id);

      if (!conversation) {
        return sendError(
          createHttpError.NotFound(
            "Conversation you are trying to message does not exist"
          )
        );
      }

      // Create message
      let messageData = await MessageModel.create({
        conversation: conversation_id,
        sender: user._id,
        message,
      });

      // Update conversation
      conversation.latestMessage = messageData._id;
      conversation.save();

      // Populate message
      messageData = await UserModel.populate(messageData, {
        path: "sender",
        select: "firstName lastName username avatar email status",
      });

      const messageObj = {
        message_id: messageData._id,
        message: messageData.message,
        sender: messageData.sender,
        files: messageData.files,
      };

      res.status(200).json({
        message: "Message sent",
        data: {
          message: messageObj,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default sendMessageController;
