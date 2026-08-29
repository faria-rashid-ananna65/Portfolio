import express from "express";
const router = express.Router();
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";
import { protect } from "../middleware/auth.js";

router.get("/", getExperiences);
router.post("/", protect, createExperience);
router.put("/:id", protect, updateExperience);
router.delete("/:id", protect, deleteExperience);

export default router;
