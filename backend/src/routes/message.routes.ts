import { getAllMessages, sendMessage } from "@/controllers/messageController";
import isAuthenticated from "@/middlewares/isAuthenticated";
import express from "express";

const router = express.Router();

router.route("/").post(isAuthenticated, sendMessage);
router.route("/:conversation_id").get(isAuthenticated, getAllMessages);

export default router;
