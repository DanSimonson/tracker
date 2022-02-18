import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Timer from "../Models/TimerModel.js";

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
timerRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    console.log("req.params.id: ", req.params.id);
    const timer = await Timer.findById(req.params.id);
    console.log("timer---------: ", timer);
    if (timer) {
      const deleteTimer = await timer.remove();
      console.log("deleteTimer-------: ", deleteTimer);
      res.send({ message: "Timer Deleted", timer: deleteTimer });
    } else {
      res.status(404).send({ message: "Timer Not Found" });
    }
  })
);

export default timerRouter;
