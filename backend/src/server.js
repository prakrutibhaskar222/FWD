import express from "express";
import productRoutes from "../routes/productRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(rateLimiter)


app.use("/api/products",productRoutes)

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server started on port: ",PORT);
  });
})



