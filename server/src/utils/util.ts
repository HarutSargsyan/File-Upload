import path from "path";
import { readdir, stat } from "fs/promises";

export const getPath = (name: string) => {
  return path.join(__dirname, "..", "..", "public", "images", `${name}`);
};

export const readDir = async (folder: string) =>
  await readdir(path.join(__dirname, "..", "..", "public", folder));

export const getFileSize = async (path: string) => {
  const { size } = await stat(path);
  return size;
};
