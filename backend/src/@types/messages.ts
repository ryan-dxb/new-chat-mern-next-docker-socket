import { Request } from "express";

export interface SendMessagesRequest extends Request {
  body: {
    conversation_id: string;
    message: string;
  };
}

export interface GetAllMessagesRequest extends Request {
  params: {
    conversation_id: string;
  };
}
