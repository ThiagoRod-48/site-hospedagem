import { Router } from "express";
import BookingRouter from "../domains/bookings/router.js";
import PlacesRouter from "../domains/places/router.js";
import UserRouter from "../domains/users/router.js";

const router = Router();

router.use("/users", UserRouter);
router.use("/places", PlacesRouter);
router.use("/bookings", BookingRouter);

export default router;
