import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import produceRoutes from "./routes/produceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import landRoutes from "./routes/landRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is ruuning");
});

app.use("/api/products", productRoutes);
app.use("/api/produce", produceRoutes);
app.use("/api/lands", landRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
