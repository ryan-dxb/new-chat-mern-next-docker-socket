import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction, Request } from "express";
import { findUserById } from "@/services/auth.service";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { UserDocument } from "@/models/userModel";

const logoutController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const refreshTokenFromCookies = req.cookies.refreshToken;

      console.log(refreshTokenFromCookies);

      // Find user by id
      const userFound: UserDocument = await findUserById(user._id);

      if (!userFound) {
        return sendError(createHttpError.BadRequest("User not found"));
      }

      let newRefreshTokenArray: string[] = [];

      // Remove refresh token from database
      if (refreshTokenFromCookies) {
        newRefreshTokenArray = userFound.refreshTokens.filter(
          (token: string) => token !== refreshTokenFromCookies
        );

        // Update user refresh tokens
        userFound.refreshTokens = newRefreshTokenArray;
        await userFound.save();
      }

      // Remove refresh token from cookies
      res.clearCookie("refreshToken");

      // Send response
      res.status(200).json({
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default logoutController;
