import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface ConversationInput {
  // Required fields
  name?: string;
  groupPicture?: string;
  isGroup: boolean;
  latestMessage?: mongoose.Schema.Types.ObjectId;
  groupAdmin?: mongoose.Schema.Types.ObjectId;
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
    name: { type: String, trim: true },
    groupPicture: { type: String },
    isGroup: { type: Boolean, default: false },
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
