import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routeAuth from "./routes/auth.js";
import routeProduct from "./routes/product.js";
import routeUsers from "./routes/users.js";
import dotenv from "dotenv";
const app = express();
const port = 3001;
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB.");
  } catch (err) {
    console.log(err);
  }
};
  
// midlleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", routeAuth);
app.use("/", routeProduct);
app.use("/", routeUsers);

app.listen(port, () => {
  connect();
  console.log(`server is conected in port ${port}`);
});
