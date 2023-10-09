import { Request } from "express";

export interface FriendInviteRequest extends Request {
  body: {
    receiver_email: string;
  };
}
