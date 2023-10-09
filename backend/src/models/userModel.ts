import mongoose from "mongoose";
import bcrypt from "bcrypt";

export enum Roles {
  USER = "user",
  ADMIN = "admin",
}

export interface UserInput {
  // Required fields
  email: string;
  username: string;
  password: string;
  isEmailVerified: boolean;
  isAccountActive: boolean;
  refreshTokens: string[];
  friends: mongoose.Schema.Types.ObjectId[];
  pendingFriendInvitations: mongoose.Schema.Types.ObjectId[];
  pendingFriendSentRequests: mongoose.Schema.Types.ObjectId[];

  // Optional fields
  provider?: string;
  googleId?: string;
  avatar?: { url: string; publicId: string };
  firstName?: string;
  lastName?: string;
  status?: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: Object, url: String, publicId: String },
    username: { type: String, required: true, unique: true, trim: true },
    status: { type: String, default: "Hi there!!!" },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pendingFriendInvitations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendInvitation",
      },
    ],
    pendingFriendSentRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendInvitation",
      },
    ],

    isAccountActive: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    provider: { type: String },
    googleId: { type: String },

    refreshTokens: [{ type: String, default: [] }],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  console.log("user", user);

  console.log("candidatePassword", candidatePassword);
  console.log("user.password", user.password);
  return bcrypt.compare(candidatePassword, user.password).catch((e) => {
    console.log("e", e);
    return false;
  });
};

// Remove password / refresh token / version / from user object and add id field
UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.__v;
  user.id = user._id;
  delete user._id;
  return user;
};

const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
