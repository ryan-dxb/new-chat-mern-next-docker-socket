import asyncHandler from "express-async-handler";
import { RequestHandler, Response, NextFunction } from "express";
import { ResendVerifyEmail } from "@/@types/auth";
import { findUserByEmail } from "@/services/auth.service";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";
import { UserDocument } from "@/models/userModel";
import EmailVerificationTokenModel from "@/models/emailVerificationTokenModel";
import generateVerificationToken from "@/helpers/generateVerificationToken";
import { sendVerificationEmail } from "@/utils/sendEmail";

const resendVerifyEmailController: RequestHandler = asyncHandler(
  async (req: ResendVerifyEmail, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      // Check if user exists
      const user: UserDocument = await findUserByEmail(email);

      if (!user) {
        return sendError(createHttpError.NotFound("User not found"));
      }

      // Check if user is already verified
      if (user.isEmailVerified) {
        return sendError(
          createHttpError.BadRequest("Email is already verified")
        );
      }

      // Check if user has already requested for verification email and if token found then delete it
      const tokenFound = await EmailVerificationTokenModel.findOneAndDelete({
        owner: user.id,
      });

      // Create new token
      const token = await generateVerificationToken();

      // Save token to database
      await EmailVerificationTokenModel.create({
        token,
        owner: user.id,
      });

      // Send verification email
      await sendVerificationEmail(user, token);

      res.status(200).json({
        message: "Verification email sent",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default resendVerifyEmailController;
