import { UserModel } from "./user";

export interface ConversationModel {
  conversation_id: string;
  isGroup: boolean;
  users: UserModel[];
  // latestMessage: MessageModel;
}
