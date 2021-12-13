import { Request, Response } from "express";
import { unlink } from "fs/promises";
import { getPath, readDir, getFileSize } from "../utils/util";

const BACKEND_URL = process.env.BACKEND_URL;

export const postImage = (req: Request, res: Response) => {
  const { mimetype: type, size, filename: name } = req.file ?? {};

  const src = `${BACKEND_URL}/images/${name}`;
  res.json({ type, size, name, src });
};

export const getImages = async (_: Request, res: Response) => {
  const files = await readDir("images");
  const readyFiles: any[] = [];

  for (const file of files) {
    const fileSrc = getPath(file);
    const fileSplited = file.split(".");
    const size = await getFileSize(fileSrc);
    const type = fileSplited[fileSplited.length - 1];
    const src = `${BACKEND_URL}/images/${file}`;
    const obj = {
      size,
      type,
      name: file,
      src,
    };
    readyFiles.push(obj);
  }
  res.json(readyFiles);
};

export const deleteImage = (req: Request, res: Response) => {
  const name = req.params.filename;
  try {
    unlink(getPath(name));
    res.json({ name });
  } catch (error) {
    console.error(error);
  }
};
