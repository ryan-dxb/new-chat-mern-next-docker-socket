import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { LoginUser } from "@/@types/auth";
import { checkUserCredentials } from "@/services/auth.service";
import { generateTokens } from "@/services/token.service";
import createHttpError from "http-errors";
import sendError from "@/utils/sendError";

const loginController: RequestHandler = asyncHandler(
  async (req: LoginUser, res: Response, next: NextFunction) => {
    try {
      const refreshTokenFromCookies = req.cookies.refreshToken;

      const { email, password } = req.body;

      if (!email || !password) {
        return sendError(
          createHttpError.BadRequest("Please provide all required fields")
        );
      }

      const user = await checkUserCredentials({ email, password });

      if (!user) {
        return sendError(createHttpError.Unauthorized("Invalid credentials"));
      }

      const { newAccessToken, newRefreshToken } = await generateTokens({
        id: user.id,
        email: user.email,
      });

      let newRefreshTokenArray: string[] = [];

      // Check if user has refresh Token from cookies
      if (refreshTokenFromCookies) {
        // Filter out the refresh token from the database that matches the refresh token from the cookies
        newRefreshTokenArray = user.refreshTokens.filter(
          (token: string) => token !== refreshTokenFromCookies
        );

        newRefreshTokenArray.push(newRefreshToken);
        // Add the new refresh token to the array
      } else {
        // If user does not have refresh token from cookies then add the new refresh token to the array
        newRefreshTokenArray = [...user.refreshTokens, newRefreshToken];
      }

      // If user already has 10 refresh tokens then remove the oldest one
      if (newRefreshTokenArray.length > 10) {
        newRefreshTokenArray.shift();
      }

      // Update user refresh tokens
      user.refreshTokens = newRefreshTokenArray;

      await user.save();

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.HTTPONLY_SECURE === "true" ? true : false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });

      // Send new access token to client
      res.status(200).json({
        message: "Login successful",
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
          },
          accessToken: newAccessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default loginController;
