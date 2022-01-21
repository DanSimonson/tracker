import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Timer from "../Models/timerModel.js";

const timerRouter = express.Router();

timerRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const timers = await Timer.find({});
    res.send({ timers });
  })
);

timerRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const timer = new Timer({
      time: req.body.time,
      user_id: req.body.user_id,
      name: req.body.name,
    });
    const createdTimer = await timer.save();
    res.send({ message: "Timer Created", timer: createdTimer });
  })
);

export default timerRouter;
