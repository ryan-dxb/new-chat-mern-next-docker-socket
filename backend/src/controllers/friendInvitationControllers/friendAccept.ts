import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction } from "express";
import { FriendInviteRequest } from "@/@types/friendInvite";

const friendInviteController: RequestHandler = asyncHandler(
  async (req: FriendInviteRequest, res: Response, next: NextFunction) => {}
);

export default friendInviteController;
