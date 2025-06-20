import express from "express";
import User from "../model/user.model.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../config/verify.js";
import jwt from "jsonwebtoken";
// import { fileURLToPath } from "url";
// import { config } from "dotenv";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// config({
//   path: path.resolve(__dirname, "../.env.local"),
// });

const router = express.Router();

export const register = router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check email already exist
    const existingUser = await User.findOne({ email });
    //if yes send res to user
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }
    //if not create new user
    const newUser = new User({ name, email, password });
    // generate verificationToken
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    // save user in db
    await newUser.save();
    sendVerificationEmail(
      newUser.verificationToken,
      newUser.email,
      newUser.name
    );
  } catch (err) {
    console.log(`Something went wrong: ${err.message}`);
  }
});

export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    //find the user with a token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid Token!" });
    }
    //mark user as verify
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Verification successfull" });
  } catch (err) {
    console.log("Verification failed");
    return res.status(500).json({ message: "Verification failed!" });
  }
};
const generateKey = crypto.randomBytes(20).toString("hex");
export const login = router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ failure: "User not found" });
    }
    if (existingUser.password !== password) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ userID: existingUser._id }, generateKey(), {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } catch (err) {
    console.log("Error while logging in try again later" + err?.message);
    return res.status(500).json({ failure: "Internal Server Error" });
  }
});
