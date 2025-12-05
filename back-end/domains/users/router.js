import bcrypt from "bcryptjs";
import { Router } from "express";
import { connectDb } from "../../config/db.js";
import user from "./model.js";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();

async function start() {
  await connectDb();
  console.log("MongoDB conectado!");

  router.get("/", async (req, res) => {
    try {
      const userDoc = await user.find();

      res.json(userDoc);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, bcryptSalt);

    try {
      const newUserDoc = await user.create({
        name,
        email,
        password: encryptedPassword,
      });

      res.json(newUserDoc);
    } catch (error) {
      res.status(500).json(error);
    }
  });
}

start();

export default router;
