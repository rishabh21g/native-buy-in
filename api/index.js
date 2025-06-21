import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { login, register, verifyEmail } from "./routes/user.route.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
connectDB();
app.use("/api/user", register);
app.get("/verify/:token", verifyEmail);
app.use("/api/user" , login)

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
