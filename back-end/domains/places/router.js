import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { JWTVerify } from "../../utils/jwt.js";
import { uploadImage, uploadSupabase } from "./controller.js";
import place from "./model.js";

const router = Router();
async function start() {
  await connectDb();

  router.post("/", async (req, res) => {
    const {
      title,
      city,
      photos,
      description,
      extras,
      price,
      perks,
      checkin,
      checkout,
      guests,
    } = req.body;

    try {
      const { _id: owner } = await JWTVerify(req);

      const newPlaceDoc = await place.create({
        owner,
        title,
        city,
        photos,
        description,
        extras,
        perks,
        price,
        checkin,
        checkout,
        guests,
      });

      res.json(newPlaceDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json("Deu erro ao criar um novo lugar");
    }
  });

  router.post("/upload/link", async (req, res) => {
    const { link } = req.body;

    try {
      const fileURL = await uploadSupabase({ link });

      res.json(fileURL);
    } catch (error) {
      console.error(error);
      res.status(500).json("Deu erro ao baixar a imagem");
    }
  });

  router.post("/upload", uploadImage().array("files", 10), async (req, res) => {
    try {
      const photos = await Promise.all(
        req.files.map((file) => uploadSupabase({ file }))
      );

      res.json(photos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao subir imagens" });
    }
  });
}

start();

export default router;
