import { Request } from "express";

export interface SendMessagesRequest extends Request {
  params: {
    conversation_id: string;
  };
  body: {
    message: string;
  };
}

export interface GetAllMessagesRequest extends Request {
  params: {
    conversation_id: string;
  };
}
