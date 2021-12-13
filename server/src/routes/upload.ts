import { Router } from "express";
import { upload } from "../utils/multer";
import { deleteImage, getImages, postImage } from "../controllers/upload";

const router = Router();

router.get("/", getImages);

router.post("/", upload.single("photo"), postImage);

router.delete("/:filename", deleteImage);

export default router;
