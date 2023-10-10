import { Request } from "express";

export interface FriendInviteRequest extends Request {
  body: {
    receiver_email: string;
  };
}

export interface CancelInviteRequest extends Request {
  body: {
    request_id: string;
    receiver_email: string;
  };
}
