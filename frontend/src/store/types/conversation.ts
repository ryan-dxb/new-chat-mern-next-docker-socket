import { MessageModel } from "./message";
import { UserModel } from "./user";

export interface ConversationModel {
  conversation_id: string;
  isGroup: boolean;
  users: UserModel[];
  latestMessage: MessageModel;
}

export interface FetchOrCreateConversationResponse {
  message: string;
  data: {
    conversation: ConversationModel;
  };
}

export interface GetMessagesResponse {
  message: string;
  data: {
    messages: MessageModel[];
  };
}
