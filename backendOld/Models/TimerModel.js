import mongoose from "mongoose";

const timerSchema = new mongoose.Schema(
  {
    time: { type: Number, required: true },
    name: { type: String, required: true },
    user_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Timer = mongoose.model("Timer", timerSchema);
export default Timer;
