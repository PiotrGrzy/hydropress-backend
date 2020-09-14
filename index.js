import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/mongoose.js";
import loginRoute from "./user/user.login.js";
import testRoute from "./user/testRoute.js";
import orderRoute from "./order/order.route.js";

const port = process.env.PORT || 5000;

const app = express();
dotenv.config();
console.log(process.env.DB_ADMIN);
connectDB();

// middlewares

app.use(cors());
app.use(express.json({ limit: "10kb" }));

// routes

app.use("/api/login", loginRoute);
app.use("/api/test", testRoute);
app.use("/api/orders", orderRoute);

app.listen(port, () => console.log("Server runnnig on port: " + port));
