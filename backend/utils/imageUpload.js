import getImageKit from "../config/imagekit.js";
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported. Allowed: JPG, PNG, GIF, WebP, PDF"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 5,
  },
});

const uploadToImageKit = async (fileBuffer, fileName, folder = "portfolio") => {
  try {
    const timestamp = Date.now();
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const response = await getImageKit().upload({
      file: fileBuffer,
      fileName: `${folder}/${timestamp}_${safeName}`,
      folder,
      useUniqueFileName: false,
    });
    return response.url;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

const deleteFromImageKit = async (fileUrl) => {
  try {
    const match = fileUrl.match(/\/([^/]+)\/?$/);
    if (match) {
      await getImageKit().deleteFile(match[1]);
    }
  } catch (error) {
    console.error("Delete failed:", error.message);
  }
};

export { upload, uploadToImageKit, deleteFromImageKit };
