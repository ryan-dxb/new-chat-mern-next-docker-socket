import {
  cancelFriendSentRequest,
  deleteFriend,
  friendAccept,
  friendInvite,
  friendReject,
} from "@/controllers/friendInvitationControllers";
import { getOwnProfile } from "@/controllers/userControllers";
import isAuthenticated from "@/middlewares/isAuthenticated";
import schemaValidator from "@/middlewares/schemaValidator";
import { loginUserSchema, registerUserSchema } from "@/schema/auth.schema";
import express from "express";

const router = express.Router();

router.route("/send-invite").post(isAuthenticated, friendInvite);
router.route("/cancel-invite").post(isAuthenticated, cancelFriendSentRequest);
router.route("/accept-invite").post(isAuthenticated, friendAccept);
router.route("/reject-invite").post(isAuthenticated, friendReject);
router.route("/delete-friend").post(isAuthenticated, deleteFriend);

export default router;
