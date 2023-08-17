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

// USING MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://i-cart-frontend.vercel.app"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(cors({ credentials: true, optionsSuccessStatus: 200 }));

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       const allowedOrigins = [
//         process.env.FRONTEND_URL,
//         process.env.FRONTEND_URL_2,
//         process.env.FRONTEND_URL_3,
//       ];
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

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
