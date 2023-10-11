import {
  addUserToGroup,
  createGroupConversation,
  createOrFetchDirectConversation,
  fetchAllConversations,
  removeUserFromGroup,
} from "@/controllers/conversationControllers";
import { getOwnProfile } from "@/controllers/userControllers";
import isAuthenticated from "@/middlewares/isAuthenticated";
import schemaValidator from "@/middlewares/schemaValidator";
import express from "express";

const router = express.Router();

router.route("/").get(isAuthenticated, fetchAllConversations);

router
  .route("/create-fetch-direct-conversation")
  .post(isAuthenticated, createOrFetchDirectConversation);

router
  .route("/create-group-conversation")
  .post(isAuthenticated, createGroupConversation);

router.route("/add-user-to-group").post(isAuthenticated, addUserToGroup);
router
  .route("/remove-user-from-group")
  .post(isAuthenticated, removeUserFromGroup);

export default router;
