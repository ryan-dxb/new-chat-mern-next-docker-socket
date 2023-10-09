import asyncHandler from "express-async-handler";
import { Roles } from "@/models/userModel";
import sendError from "@/utils/sendError";
import createHttpError from "http-errors";

type RolesArray = Array<Roles>;

const checkRole = (...role: RolesArray) =>
  asyncHandler(async (req, res, next) => {
    try {
      // Check if user is logged in and has the role
      if (!req.user || !req.user.roles) {
        return sendError(createHttpError.Unauthorized("Not authorized"));
      }

      const requiredRolesArray = [...role];

      const userRoles = req.user.roles as RolesArray;

      // Check if user has the required role
      const hasRequiredRole = userRoles
        .map((role) => requiredRolesArray.includes(role))
        .find((role) => role === true);

      if (!hasRequiredRole) {
        return sendError(createHttpError.Unauthorized("Not authorized"));
      }

      next();
    } catch (error) {
      next(error);
    }
  });

export default checkRole;
