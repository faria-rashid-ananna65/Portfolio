import { uploadToImageKit } from "../utils/imageUpload.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }

    const folder = req.body.folder || "portfolio";
    const url = await uploadToImageKit(req.file.buffer, req.file.originalname, folder);

    res.status(200).json({
      success: true,
      url,
      fileName: req.file.originalname,
      size: req.file.size,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files provided" });
    }

    const folder = req.body.folder || "portfolio";
    const uploadPromises = req.files.map((file) =>
      uploadToImageKit(file.buffer, file.originalname, folder)
    );

    const urls = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      urls,
      count: urls.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
