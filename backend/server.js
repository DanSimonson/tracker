import express from "express";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./Routers/productRouter.js";
import data from "./data.js";
import connectDB from "./Config/db.js";

dotenv.config();
//connectDB();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
//app.use("/api/products", productRouter);

app.get("/api/products", (req, res) => {
  res.send(data.products);
  //console.log("data.products: ", data.products);
});

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`serve at http://localhost:${port}`);
});
