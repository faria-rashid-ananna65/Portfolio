import express from "express";
const router = express.Router();
import {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/auth.js";

router.get("/", protect, getMessages);
router.get("/:id", protect, getMessage);
router.post("/", createMessage);
router.put("/:id", protect, updateMessage);
router.delete("/:id", protect, deleteMessage);

export default router;
