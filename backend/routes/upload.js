import express from "express";
const router = express.Router();
import { uploadImage, uploadMultiple } from "../controllers/uploadController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../utils/imageUpload.js";

router.post("/", protect, upload.single("file"), uploadImage);
router.post("/multiple", protect, upload.array("files", 5), uploadMultiple);

export default router;
