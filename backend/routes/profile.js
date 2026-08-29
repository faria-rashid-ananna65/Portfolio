import express from "express";
const router = express.Router();
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/auth.js";

router.get("/", getProfile);
router.put("/", protect, updateProfile);

export default router;
