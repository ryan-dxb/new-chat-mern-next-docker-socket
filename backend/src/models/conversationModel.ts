import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface ConversationInput {
  // Required fields
  name: string;
  picture: string;
  isGroup: boolean;
  latestMessage: string;
  admin: mongoose.Schema.Types.ObjectId;
  users: mongoose.Schema.Types.ObjectId[];
}

export interface ConversationDocument
  extends ConversationInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new mongoose.Schema<ConversationDocument>(
  {
    name: { type: String, required: true, trim: true },
    picture: { type: String, required: true },
    isGroup: { type: Boolean, default: false },
    latestMessage: { type: String },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    collection: "conversations",
    timestamps: true,
  }
);

const ConversationModel =
  mongoose.models.ConversationModel ||
  mongoose.model<ConversationDocument>("Conversation", ConversationSchema);

export default ConversationModel;
