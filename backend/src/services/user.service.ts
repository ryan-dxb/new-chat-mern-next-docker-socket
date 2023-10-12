import { UserDocument } from "@/models/userModel";

export const createUserObjWithoutPassword = (user: UserDocument) => {
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshTokens;
  delete userObj.__v;
  userObj.id = userObj._id;
  delete userObj._id;

  return userObj;
};
