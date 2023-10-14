import asyncHandler from "express-async-handler";
import { RequestHandler, Request, Response, NextFunction } from "express";
import ConversationModel from "@/models/conversationModel";
import UserModel from "@/models/userModel";

const fetchAllConversationsController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    // Fetch all conversations of the user
    let conversations = await ConversationModel.find({
      users: {
        $in: [user._id],
      },
    })
      .populate("users", "firstName lastName username avatar email  status")
      .populate(
        "groupAdmin",
        "firstName lastName username avatar email  status"
      )
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    // Populate the latest message of each conversation
    conversations = await UserModel.populate(conversations, {
      path: "latestMessage.sender",
      select: "firstName lastName username avatar email  status",
    });

    const conversationObject = conversations.map((conversation) => {
      return {
        conversation_id: conversation._id,
        name: conversation.name,
        isGroup: conversation.isGroup,
        groupAdmin: conversation.groupAdmin,
        users: conversation.users,
        latestMessage: {
          message_id: conversation.latestMessage._id,
          message: conversation.latestMessage.message,
          sender: conversation.latestMessage.sender,
          files: conversation.latestMessage.files,
        },
      };
    });

    res.status(200).json({
      message: "Conversations Fetched",
      data: {
        conversations: conversationObject,
      },
    });
  }
);

export default fetchAllConversationsController;
