import express from "express";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

import { UserRouter } from "./routes/user";
import { ProductRouter } from "./routes/product";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", UserRouter);
app.use("/products", ProductRouter);

mongoose.connect(process.env.DB_URL);

app.listen(3001, () => console.log("Server starterd"));
