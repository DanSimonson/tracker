import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./Routers/userRouter.js";
import timerRouter from "./Routers/timerRouter.js";
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

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

// app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
// );

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`serve at http://localhost:${PORT}`);
});
