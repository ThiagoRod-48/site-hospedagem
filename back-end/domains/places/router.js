import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { __dirname } from "../../server.js";
import { downloadImage } from "../../utils/imageDownloader.js";
import { JWTVerify } from "../../utils/jwt.js";
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
      const filename = await downloadImage(link, `${__dirname}/tmp/`);

      res.json(filename);
    } catch (error) {
      console.error(error);
      res.status(500).json("Deu erro ao baixar a imagem");
    }
  });
}

start();

export default router;
