import { Request } from "express";

export interface CreateOrFetchConversationRequest extends Request {
  body: {
    friend_id: string;
  };
}
