import multer, { FileFilterCallback } from "multer";
import {Request} from "express";

const storage = multer.diskStorage({
  destination: function (_: Request, file: Express.Multer.File, cb) {
    cb(null, "public/images");
  },
  filename: function (_: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, file.originalname);
  },
});

const fileFilter = (_: Request, file: any, cb: FileFilterCallback) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({ storage, fileFilter });
