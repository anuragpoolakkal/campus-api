import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import joi from "joi";

const router = express.Router();
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const signupSchema = joi.object({
  name: joi.string().required(),
  gender: joi.string().valid("M", "F").required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  type: joi.string().valid("student", "faculty", "admin", "parent").required(),
});

router.post("/register", async (req, res) => {
  try {
    const { value: data, error } = signupSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ message: error.details[0].message, success: false });
    }

    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassowrd = await bcrypt.hash(data.password, 10);

    const user = new User({
      name: data.name,
      email: data.email,
      gender: data.gender,
      type: data.type,
      password: hashedPassowrd,
    });

    await user.save();

    res.send({ message: "User registered successfully", data: user, success: true});
  } catch (error) {
    res.status(500).send({ message: error.message , success: false});
  }
});

router.patch("/updatepassword", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

router.post("/login", async (req, res) => {
  const { value: data, error } = loginSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, success: false });
  }

  try {
    const user = await userModel
      .findOne({ email: data.email })
      .select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Logged in successfully", token, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

export default router;
