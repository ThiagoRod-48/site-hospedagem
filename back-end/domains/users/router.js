import bcrypt from "bcryptjs";
import "dotenv/config";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { connectDb } from "../../config/db.js";
import user from "./model.js";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();
const { JWT_SECRET_KEY } = process.env;

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

  router.get("/profile", async (req, res) => {
    const { token } = req.cookies;

    if (token) {
      jwt.verify(token, JWT_SECRET_KEY, {}, (error, userInfor) => {
        if (error) throw error;

        res.json(userInfor);
      });
    } else {
      res.json(null);
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

      const { _id } = newUserDoc;
      const newUserObj = { name, email, _id };

      jwt.sign(newUserObj, JWT_SECRET_KEY, {}, (error, token) => {
        if (error) throw error;

        res.cookie("token", token).json(newUserObj);
      });
    } catch (error) {
      console.error("REGISTER ERROR:", error);
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

        if (passwordCorrect) {
          const newUserObj = { name, email, _id };
          const token = jwt.sign(
            newUserObj,
            JWT_SECRET_KEY,
            {},
            (error, token) => {
              if (error) {
                console.erro(error);
                res.status(500).json(error);
                return;
              }

              res.cookie("token", token).json(newUserObj);
            }
          );
        } else res.status(400).json("Senha inválida!");
      } else {
        res.status(400).json("Usuário não encontrado!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.post("/logout", (req, res) => {
    res.clearCookie("token").json("Usuário deslogado!");
  });
}

start();

export default router;
