import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { register } from "./routes/user.route.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
connectDB();
app.post("/api/register", register);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
