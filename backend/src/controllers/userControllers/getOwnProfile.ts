import asyncHandler from "express-async-handler";
import { RequestHandler, Request, Response } from "express";
import { createUserObjWithoutPassword } from "@/services/user.service";

const getOwnProfileController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next) => {
    try {
      const user = req.user;

      const userObj = createUserObjWithoutPassword(user);

      res.status(200).json({
        message: "User profile",
        data: {
          user: userObj,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default getOwnProfileController;
