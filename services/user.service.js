// userService.js
import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const welcome = async () => {
    return "<h1>Welcome to the user</h1>";
};

const register = async (userData) => {
    const existingUser = await userModel.findOne({ email: userData.email });

    if (existingUser) {
        throw { status: 400, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({
        name: userData.name,
        gender: userData.gender,
        email: userData.email,
        role: userData.role,
        password: hashedPassword,
    });

    await user.save();

    return user;
};

const login = async (email, password) => {
    const user = await userModel.findOne({ email: email }).select("+password");

    if (!user) {
        throw { status: 400, message: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw { status: 400, message: "Invalid email or password" };
    }

    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
    });

    return { token, user };
};

const updatePassword = async (email, oldPassword, newPassword) => {
    const user = await userModel.findOne({ email: email }).select("+password");

    if (!user) {
        throw { status: 400, message: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
        throw { status: 400, message: "Invalid email or password" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

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
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
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
