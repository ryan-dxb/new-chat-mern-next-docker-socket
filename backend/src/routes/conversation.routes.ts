import {
  createGroupConversation,
  createOrFetchDirectConversation,
} from "@/controllers/conversationControllers";
import { getOwnProfile } from "@/controllers/userControllers";
import isAuthenticated from "@/middlewares/isAuthenticated";
import schemaValidator from "@/middlewares/schemaValidator";
import express from "express";

const router = express.Router();

router
  .route("/create-fetch-direct-conversation")
  .post(isAuthenticated, createOrFetchDirectConversation);

router
  .route("/create-group-conversation")
  .post(isAuthenticated, createGroupConversation);

export default router;
