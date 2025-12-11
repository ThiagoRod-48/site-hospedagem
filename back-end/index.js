import cors from "cors";
import "dotenv/config";
import express from "express";
import userRouter from "./domains/users/router.js";

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Servido esta rodando na porta ${PORT}`);
});
