import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface FriendInvitationModelDocument extends mongoose.Document {
  sender: mongoose.Schema.Types.ObjectId;
  receiver: mongoose.Schema.Types.ObjectId;
}

const FriendInvitationSchema =
  new mongoose.Schema<FriendInvitationModelDocument>(
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const FriendInvitationModel = mongoose.model<FriendInvitationModelDocument>(
  "FriendInvitation",
  FriendInvitationSchema
);

export default FriendInvitationModel;
