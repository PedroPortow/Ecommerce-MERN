import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
require('dotenv').config();

import { userRouter } from './routes/user';
import { ProductRouter } from './routes/product';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/products", ProductRouter);

mongoose.connect(`mongodb+srv://pedrolportow:${process.env.DB_PASSWORD}@ecommerce-mern.4yui1uz.mongodb.net/ecommerce-mern`);

app.listen(3001, () => console.log("Server starterd"))