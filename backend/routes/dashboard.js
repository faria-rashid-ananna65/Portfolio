import express from "express";
const router = express.Router();
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

router.get("/", protect, getDashboardStats);

export default router;
