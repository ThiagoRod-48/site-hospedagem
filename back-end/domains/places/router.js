import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { JWTVerify } from "../../utils/jwt.js";
import { uploadImage, uploadSupabase } from "./controller.js";
import place from "./model.js";

const router = Router();
async function start() {
  await connectDb();

  router.get("/", async (req, res) => {
    try {
      const placeDocs = await place.find();

      res.json(placeDocs);
    } catch (error) {
      console.error(error);
      res.status(500).json("Deu erro ao encontrar as comodações");
    }
  });

  router.get("/owner", async (req, res) => {
    const userInfor = await JWTVerify(req);

    if (!userInfor) {
      return res.status(401).json("Usuário não autenticado");
    }

    const placeDocs = await place.find({ owner: userInfor._id });
    res.json(placeDocs);
  });

  router.get("/:id", async (req, res) => {
    const { id: _id } = req.params;

    try {
      const placeDoc = await place.findOne({ _id });

      res.json(placeDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json("Deu erro ao encontrar a comodação");
    }
  });

  router.put("/:id", async (req, res) => {
    const { id: _id } = req.params;

    const {
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
    } = req.body;

    try {
      const updatePlaceDoc = await place.findOneAndUpdate(
        { _id },
        {
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
        }
      );

      res.json(updatePlaceDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json("Deu erro ao atualizar a comodação");
    }
  });

  router.post("/", async (req, res) => {
    const {
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
    } = req.body;

    try {
      const userData = await JWTVerify(req);

      if (!userData) {
        return res.status(401).json("Usuário não autenticado");
      }

      const { _id: owner } = userData;

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
