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

const userSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    gender: joi.string().valid("M", "F").required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    type: joi.string().required(),
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


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            gender,
            email,
            type,
            password: hashedPassword,
        });

        await user.save();

    res.send({ message: "User registered successfully", data: user, success: true});
  } catch (error) {
    res.status(500).send({ message: error.message , success: false});
  }
});

router.patch("/updatepassword", async (req, res) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        oldPassword: joi.string().min(8).required(),
        newPassword: joi.string().min(8).required(),
    });

    try {
        const { error } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);

        const { email, oldPassword, newPassword } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password", success: false });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password", success: false });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
    });

    try {
        const { error } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);

        const data = req.body;

        const user = await User.findOne({ username: data.username });

        if (!user) return res.status(400).send("Email or password is wrong");

        const validPassword = await bcrypt.compare(data.password, user.password);

        if (!validPassword) return res.status(400).send("Email or password is wrong");

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        return res.send({ user: user, token: token });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

router.get("/user", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
