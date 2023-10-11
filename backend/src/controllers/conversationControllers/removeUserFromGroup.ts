import asyncHandler from "express-async-handler";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { RemoveUserFromGroupRequest } from "@/@types/conversations";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import ConversationModel from "@/models/conversationModel";

const removeUserFromGroupController: RequestHandler = asyncHandler(
  async (
    req: RemoveUserFromGroupRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { friend_id, group_id } = req.body;
      const userId = req.user._id;

      if (!friend_id || !group_id) {
        return sendError(
          createHttpError.BadRequest("Group id or friend id is missing")
        );
      }

      const groupFound = await ConversationModel.findById(group_id);

      if (!groupFound) {
        return sendError(
          createHttpError.NotFound(
            "Group you are trying to remove user from does not exist"
          )
        );
      }

      // Check if the user is the admin of the group
      const isGroupAdmin =
        groupFound.groupAdmin.toString() === userId.toString();

      if (!isGroupAdmin) {
        return sendError(
          createHttpError.Unauthorized(
            "Only the admin can remove users from the group"
          )
        );
      }

      // Check if the friend is in the group
      const friendInGroup = groupFound.users.includes(friend_id);

      if (!friendInGroup) {
        return sendError(
          createHttpError.BadRequest("This user is not in the group")
        );
      }

      // Admin cannot remove himself from the group
      if (friend_id.toString() === userId.toString()) {
        return sendError(
          createHttpError.BadRequest("Admin cannot remove himself from group")
        );
      }

      // Remove the friend from the group
      const updatedGroup = await ConversationModel.findByIdAndUpdate(
        group_id,
        {
          $pull: { users: friend_id },
        },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      res.status(200).json({
        message: "User removed from group",
        updatedGroup,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default removeUserFromGroupController;
