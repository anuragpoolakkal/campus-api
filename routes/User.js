import express from "express";
import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import joi from "joi";

const router = express.Router();

router.post("/register", async (req, res) => {
    const signupSchema = joi.object({
        name: joi.string().required(),
        gender: joi.string().valid("M", "F").required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        type: joi.string().valid("student", "faculty", "admin", "parent").required(),
    });

    try {
        const { value: data, error } = signupSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        const existingUser = await userModel.findOne({ email: data.email });

        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = new User({
            name: data.name,
            gender: data.gender,
            email: data.email,
            type: data.type,
            password: hashedPassword,
        });

        await user.save();

        res.send({ message: "User registered successfully", data: user, success: true });
    } catch (error) {
        res.status(500).send({ message: error.message, success: false });
    }
});

router.post("/login", async (req, res) => {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    });

    const { value: data, error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message, success: false });
    }

    try {
        const user = await userModel.findOne({ email: data.email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password", success: false });
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password", success: false });
        }

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        console.log(payload);

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        console.log(token);

        res.json({ message: "Logged in successfully", token, success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
});

router.patch("/updatepassword", async (req, res) => {
    const passwordUpdateschema = joi.object({
        email: joi.string().email().required(),
        oldPassword: joi.string().min(8).required(),
        newPassword: joi.string().min(8).required(),
    });

    try {
        const { value: data, error } = passwordUpdateschema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        const user = await userModel.findOne({ email: data.email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password", success: false });
        }

        const isPasswordValid = await bcrypt.compare(data.oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password", success: false });
        }

        const hashedPassword = await bcrypt.hash(data.newPassword, 10);

        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

        res.json({ message: "Password updated successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/verify", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        res.json({ message: "Authorized", data: user, success: true });
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", success: false });
    }
});

export default router;
