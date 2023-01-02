import multer from "multer";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // No larger than 10mb, change as you need
    },
});
