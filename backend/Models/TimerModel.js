import mongoose from "mongoose";

const timerSchema = new mongoose.Schema(
  {
    timerItems: [
      {
        lengthOfTime: { type: Number, required: true },
        user: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Timer = mongoose.model("Timer", timerSchema);
export default Order;
