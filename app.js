import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddlware from "./middlewares/ErrorHandler.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({
    path: "./config/config.env",
});

const app = express();

app.use(
    cors({
        origin:
            process.env.CORS_ORIGIN === "*"
                ? "*" // This might give CORS error for some origins due to credentials set to true
                : process.env.CORS_ORIGIN?.split(","), // For multiple cors origin for production. Refer https://github.com/hiteshchoudhary/apihub/blob/a846abd7a0795054f48c7eb3e71f3af36478fa96/.env.sample#L12C1-L12C12
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/order/getkey", (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});
// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

export default app;

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});
app.use(ErrorMiddlware);
