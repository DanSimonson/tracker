import express from "express";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./Routers/productRouter.js";
import userRouter from "./Routers/userRouter.js";
import timerRouter from "./Routers/timerRouter.js";
import data from "./data.js";
import connectDB from "./Config/db.js";

dotenv.config();
connectDB();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/users", userRouter);
app.use("/api/timer", timerRouter);
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`serve at http://localhost:${port}`);
});
