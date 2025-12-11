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

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const userDoc = await user.findOne({ email });

      if (userDoc) {
        const passwordCorrect = bcrypt.compareSync(password, userDoc.password);
        const { name, _id } = userDoc;

        passwordCorrect
          ? res.json({ name, email, _id })
          : res.status(400).json("Senha inválida!");
      } else {
        res.status(400).json("Usuário não encontrado!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
}

start();

export default router;
