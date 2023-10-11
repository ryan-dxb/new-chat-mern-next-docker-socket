import asyncHandler from "express-async-handler";
import { RequestHandler, Request, Response, NextFunction } from "express";
import ConversationModel from "@/models/conversationModel";
import UserModel from "@/models/userModel";

const fetchAllConversationsController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;

    // Fetch all conversations of the user
    let conversations = await ConversationModel.find({
      users: {
        $in: [userId],
      },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    // Populate the latest message of each conversation
    conversations = await UserModel.populate(conversations, {
      path: "latestMessage.sender",
      select: "-password",
    });

    res.status(200).json({
      success: true,
      conversations,
    });
  }
);

export default fetchAllConversationsController;
