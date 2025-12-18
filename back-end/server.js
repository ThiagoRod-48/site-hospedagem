import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/tmp", express.static(__dirname + "/tmp"));
app.use(routes);
