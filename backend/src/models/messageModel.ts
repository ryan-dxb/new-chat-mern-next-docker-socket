import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface MessageInput {
  // Required fields
  sender: mongoose.Schema.Types.ObjectId;
  message: string;
  conversation: mongoose.Schema.Types.ObjectId;
  files?: string[];
  readBy?: mongoose.Schema.Types.ObjectId[];
}

export interface MessageDocument extends MessageInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema<MessageDocument>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    files: [{ type: String }],
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

const MessageModel =
  mongoose.models.MessageModel ||
  mongoose.model<MessageDocument>("Message", MessageSchema);

export default MessageModel;
