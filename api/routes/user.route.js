import express from "express";
import User from "../model/user.model.js";
import crypto from "crypto";
import sendVerificationEmail from "../config/verify.js";

const router = express.Router();

export const register = router.post("/", async (req, res) => {
  const { name, email, password } = await req.body;
  try {
    //check email already exist
    const existingUser = await User.findOne(email);
    //if yes send res to user
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }
    //if not create new user
    const newUser = new User({ name, email, password });
    // generate verificationToken
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    // save user in db
    newUser.save();
    sendVerificationEmail(
      newUser.verificationToken,
      newUser.email,
      newUser.name
    );
  } catch (err) {
    console.log(`Something went wrong: ${err.message}`);
  }
});
