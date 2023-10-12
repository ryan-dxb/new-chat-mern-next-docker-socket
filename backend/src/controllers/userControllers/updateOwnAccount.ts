import asyncHandler from "express-async-handler";
import { Response, NextFunction, RequestHandler } from "express";
import { UpdateOwnAccountRequest } from "@/@types/user";
import { findUserById } from "@/services/auth.service";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import UserModel from "@/models/userModel";
import { createUserObjWithoutPassword } from "@/services/user.service";

const updateOwnAccountController: RequestHandler = asyncHandler(
  async (req: UpdateOwnAccountRequest, res: Response, next: NextFunction) => {
    try {
      const { username, firstName, lastName, status, avatar } = req.body;
      const user = req.user;

      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        {
          username,
          firstName,
          lastName,
          status,
          avatar,
        },
        { new: true }
      ).select("-password");

      if (!updatedUser) {
        return sendError(createHttpError.NotFound("User not found"));
      }

      const userObj = createUserObjWithoutPassword(updatedUser);

      res.status(200).json({
        message: "Updated user successfully",
        data: {
          user: userObj,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default updateOwnAccountController;
