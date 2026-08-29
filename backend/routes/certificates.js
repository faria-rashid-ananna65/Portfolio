import express from "express";
const router = express.Router();
import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "../controllers/certificateController.js";
import { protect } from "../middleware/auth.js";

router.get("/", getCertificates);
router.post("/", protect, createCertificate);
router.put("/:id", protect, updateCertificate);
router.delete("/:id", protect, deleteCertificate);

export default router;
