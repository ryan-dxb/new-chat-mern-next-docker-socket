import asyncHandler from "express-async-handler";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { AddUserToGroupRequest } from "@/@types/conversations";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import ConversationModel from "@/models/conversationModel";
import { findUserById } from "@/services/auth.service";

const addUserToGroupController: RequestHandler = asyncHandler(
  async (req: AddUserToGroupRequest, res: Response, next: NextFunction) => {
    try {
      const { friend_id, group_id } = req.body;
      const userId = req.user._id;

      if (!friend_id || !group_id) {
        return sendError(
          createHttpError.BadRequest("Group id or friend id is missing")
        );
      }

      // Check if the user is the admin of the group
      const group = await ConversationModel.findOne({
        _id: group_id,
        groupAdmin: userId,
      });

      if (!group) {
        return sendError(
          createHttpError.Unauthorized("Only the admin can add users to group")
        );
      }

      // Check if the friend is already in the group
      const friendInGroup = await ConversationModel.findOne({
        _id: group_id,
        users: friend_id,
      });

      if (friendInGroup) {
        return sendError(
          createHttpError.BadRequest("This user is already in the group")
        );
      }

      // Check if friend exists
      const friendFound = await findUserById(friend_id);

      if (!friendFound) {
        return sendError(
          createHttpError.NotFound(
            "User you are trying to add to the group does not exist"
          )
        );
      }

      // Check if friend in user's friend list
      const userFound = await findUserById(userId.toString());

      if (!userFound) {
        return sendError(
          createHttpError.NotFound(
            "Something went wrong. Please try again later"
          )
        );
      }

      const isFriend = userFound.friends.includes(friend_id);

      if (!isFriend) {
        return sendError(
          createHttpError.BadRequest(
            "You cannot add someone who is not your friend"
          )
        );
      }

      // Add the friend to the group
      const updatedGroup = await ConversationModel.findByIdAndUpdate(
        group_id,
        { $push: { users: friend_id } },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      res.status(200).json({
        message: "Friend added to the group",
        group: updatedGroup,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default addUserToGroupController;
