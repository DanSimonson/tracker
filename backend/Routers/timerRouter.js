import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import Timer from "../Models/timerModel.js";
//import { isAuthenticated } from "../utils";

const timerRouter = express.Router();
//if (req.body.time && req.body.userId && req.body.name) {
//
timerRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const timer = new Timer({
      time: req.body.time,
      user_id: req.body.user_id,
      name: req.body.name,
    });
    const createdTimer = await timer.save();
    //console.log("createdTimer: ", createdTimer);
    // res.send({
    //   //_id: createdTimer._id,
    //   time: createdTimer.time,
    //   userId: createdTimer.user_id,
    //   name: createdTimer.name,
    // });
    res.send({ message: "Timer Created", timer: createdTimer });
  })
);
//}
// else {
//   res.status(404).send({ message: "time, userId, or name not found" });
// }

// if (req.body.timerItems.length === 0) {
//   res.status(400).send({ message: "Times not present" });
// } else {
//   const timer = new Timer({
//     timerItems: req.body.timerItems,
//   });
// }
//})
//});
/**
 * 
 * 
 * 
 * 
 userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);
 */
export default timerRouter;
