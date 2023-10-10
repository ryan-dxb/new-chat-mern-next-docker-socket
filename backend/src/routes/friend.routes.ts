import {
  cancelFriendSentRequest,
  friendInvite,
} from "@/controllers/friendInvitationControllers";
import { getOwnProfile } from "@/controllers/userControllers";
import isAuthenticated from "@/middlewares/isAuthenticated";
import schemaValidator from "@/middlewares/schemaValidator";
import { loginUserSchema, registerUserSchema } from "@/schema/auth.schema";
import express from "express";

const router = express.Router();

router.route("/send-invite").post(isAuthenticated, friendInvite);
router.route("/cancel-invite").post(isAuthenticated, cancelFriendSentRequest);

export default router;
