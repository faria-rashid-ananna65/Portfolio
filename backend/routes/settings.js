import express from "express";
const router = express.Router();
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import { protect } from "../middleware/auth.js";

router.get("/", getSettings);
router.put("/", protect, updateSettings);

export default router;
