// userService.js

import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import joi from "joi";

const welcome = async () => {
    return "<h1>Welcome to the user</h1>";
};

const register = async (userData) => {
    const signupSchema = joi.object({
        name: joi.string().required(),
        gender: joi.string().valid("M", "F").required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        role: joi.string().valid("student", "faculty", "admin", "parent").required(),
    });

    const { value: data, error } = signupSchema.validate(userData);

    if (error) {
        throw { status: 400, message: error.details[0].message };
    }

    const existingUser = await userModel.findOne({ email: data.email });

    if (existingUser) {
        throw { status: 400, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
        name: data.name,
        gender: data.gender,
        email: data.email,
        role: data.role,
        password: hashedPassword,
    });

    await user.save();

    return user;
};

const login = async (email, password) => {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    });

    const { value: data, error } = loginSchema.validate({ email, password });

    if (error) {
        throw { status: 400, message: error.details[0].message };
    }

    const user = await userModel.findOne({ email: data.email }).select("+password");

    if (!user) {
        throw { status: 400, message: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        throw { status: 400, message: "Invalid email or password" };
    }

    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    return { token, user };
};

const updatePassword = async (email, oldPassword, newPassword) => {
    const passwordUpdateschema = joi.object({
        email: joi.string().email().required(),
        oldPassword: joi.string().min(8).required(),
        newPassword: joi.string().min(8).required(),
    });

    const { value: data, error } = passwordUpdateschema.validate({
        email,
        oldPassword,
        newPassword,
    });

    if (error) {
        throw { status: 400, message: error.details[0].message };
    }

    const user = await userModel.findOne({ email: data.email }).select("+password");

    if (!user) {
        throw { status: 400, message: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(data.oldPassword, user.password);

    if (!isPasswordValid) {
        throw { status: 400, message: "Invalid email or password" };
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    return { message: "Password updated successfully" };
};

const getAllUsers = async () => {
    const users = await userModel.find();
    return users;
};

const getUserById = async (userId) => {
    const user = await userModel.findById(userId);
    if (!user) {
        throw { status: 404, message: "User not found" };
    }
    return user;
};

const verifyUser = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await userModel.findById(userId);
        if (!user) {
            throw { status: 401, message: "Unauthorized" };
        }
        return user;
    } catch (error) {
        throw { status: 401, message: "Unauthorized" };
    }
};

export default {
    welcome,
    register,
    login,
    updatePassword,
    getAllUsers,
    getUserById,
    verifyUser,
};
