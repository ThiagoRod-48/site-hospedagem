import { Router } from "express";
import placesRouter from "../domains/places/router.js";
import userRouter from "../domains/users/router.js";

const router = Router();

router.use("/users", userRouter);
router.use("/places", placesRouter);

export default router;
