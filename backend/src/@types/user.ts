import { Request } from "express";

export interface UpdateOwnAccountRequest extends Request {
  body: {
    username?: string;
    firstName?: string;
    lastName?: string;
    status?: string;
    avatar?: string;
  };
}
