import express from "express";
const router = express.Router();
import {
  getSkills,
  getSkillsByCategory,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";
import { protect } from "../middleware/auth.js";

router.get("/", getSkills);
router.get("/grouped", getSkillsByCategory);
router.post("/", protect, createSkill);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

export default router;
