import asyncHandler from "express-async-handler";
import { RequestHandler, Request, Response } from "express";
import { findUserById } from "@/services/auth.service";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { UserDocument } from "@/models/userModel";

const getOwnProfileController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next) => {
    try {
      const user = req.user;

      const userProfile: UserDocument = await findUserById(user._id);

      if (!userProfile) {
        sendError(createHttpError.NotFound("User not found"));
      }

      res.status(200).json({
        message: "User profile",
        data: {
          user: {
            id: userProfile._id,
            email: userProfile.email,
            isAccountActive: userProfile.isAccountActive,
            isEmailVerified: userProfile.isEmailVerified,
            roles: userProfile.roles,
            username: userProfile.username,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default getOwnProfileController;
