import { UserModel } from "./user";

export type MessageModel = {
  message_id: string;
  message: string;
  sender: UserModel;
  files: string[];
  createdAt: string;
};
