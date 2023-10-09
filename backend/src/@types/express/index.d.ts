import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      user: {
        _id: string;
        email: string;
        roles: string[];
      };
    }
  }
}
