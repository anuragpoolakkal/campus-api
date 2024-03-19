import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, gender, email, password, type } = req.body;

    if (!name || !gender || !email || !password || !type) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassowrd = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      gender,
      email,
      type,
      password: hashedPassowrd,
    });

    await user.save();

    res.send({ message: "User registered successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
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

export default router;
