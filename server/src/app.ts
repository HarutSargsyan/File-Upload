import cors from "cors";
require("dotenv").config();

import express from "express";
import router from "./routes/upload";
import morgan from "morgan";
import path from "path";

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/upload", router);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));
