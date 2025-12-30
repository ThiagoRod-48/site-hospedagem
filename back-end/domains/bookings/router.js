import { Router } from "express";
import { connectDb } from "../../config/db.js";
import { JWTVerify } from "../../utils/jwt.js";
import Booking from "./model.js";

const router = Router();

async function start() {
  await connectDb();

  router.get("/owner", async (req, res) => {
    try {
      const { _id: id } = await JWTVerify(req);

      try {
        const bookingDoc = await Booking.find({ user: id }).populate("place");

        res.json(bookingDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json("Deu erro ao buscar as reservas daquele usuário");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("Deu erro ao validar o token do usuário");
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
