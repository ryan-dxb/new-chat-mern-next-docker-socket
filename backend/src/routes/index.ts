import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import friendRoutes from "./friend.routes";
import conversationRoutes from "./conversation.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/friend", friendRoutes);
router.use("/conversation", conversationRoutes);

export default router;
