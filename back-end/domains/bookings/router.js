import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { JWTVerify } from "../../utils/jwt.js";
import Booking from "./model.js";

const router = Router();

async function start() {
  await connectDb();

  router.get("/owner", async (req, res) => {
    try {
      const userData = await JWTVerify(req);

      const { _id: id } = userData;

      const bookingDoc = await Booking.find({ user: id }).populate("place");

      res.json(bookingDoc);
    } catch (error) {
      console.error(error);
      res.status(401).json("Usuário não autenticado ou token inválido");
    }
  });

  router.post("/", async (req, res) => {
    const { place, user, price, total, checkin, checkout, guests, nights } =
      req.body;

    try {
      const newBookingDoc = await Booking.create({
        place,
        user,
        price,
        total,
        checkin,
        checkout,
        guests,
        nights,
      });

      res.json(newBookingDoc);
    } catch (error) {
      console.error(error);
      res.status(500).json("Deu erro ao criar a reserva");
    }
  });
}

start();

export default router;
