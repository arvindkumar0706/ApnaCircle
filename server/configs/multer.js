// server/configs/multer.js

import multer from "multer";

// ✅ Use memory storage for Vercel
const storage = multer.memoryStorage();

// ✅ File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "video/mp4",
    "video/mov",
    "video/webm",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// ✅ Multer upload config
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});