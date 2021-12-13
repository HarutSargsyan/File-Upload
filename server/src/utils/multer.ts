import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (_: any, file: any, cb: any) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({ storage, fileFilter });
