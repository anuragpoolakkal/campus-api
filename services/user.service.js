// userService.js
import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Permissions from "../models/Permissions.js";
import { permissions } from "../utils/permissions.js";

const welcome = async () => {
    return "<h1>Welcome to the user</h1>";
};

export const register = async (userData) => {
    const existingUser = await userModel.findOne({ email: userData.email });

    if (existingUser) {
        throw { status: 400, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new userModel({
        name: userData.name,
        gender: userData.gender,
        email: userData.email,
        role: userData.role,
        password: hashedPassword,
    });

    await user.save();

    return {
        _id: user._id,
        name: user.name,
        gender: user.gender,
        email: user.email,
        role: user.role,
    };
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

    const token = jwt.sign(payload, process.env.TOKEN_SECRET);

    return {
        token,
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};

const updatePassword = async (email, oldPassword, newPassword) => {
    const user = await userModel.findOne({ email: email }).select("+password");

    if (!user) {
        throw { status: 400, message: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
        throw { status: 400, message: "Old password is incorrect" };
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

const getPermissions = async (collegeId) => {
    const permissionsData = await Permissions.findOne({
        collegeId
    }).lean();
    if (!permissionsData) {
        throw { status: 404, message: "Permissions not found" };
    }

    permissionsData.allPermissions = permissions;

    return permissionsData;
};

const resetPermissions = async (collegeId) => {
    try {
        await Permissions.deleteOne({ collegeId });
        const defaultPermissions = [];
        for (const permission of Object.keys(permissions)) {
            defaultPermissions.push(permission);
        }
        const newPermissions = new Permissions({
            collegeId,
            admin: defaultPermissions,
            principal: defaultPermissions,
            faculty: defaultPermissions,
            student: defaultPermissions,
        });

        await newPermissions.save();

        return { message: "Permissions reset successfully" };
    }
    catch (error) {
        throw { status: 400, message: error.message };
    }
}

const updatePermissions = async (collegeId, adminPermissions, principalPermissions, facultyPermissions, studentPermissions) => {
    try {
        await Permissions.findOneAndUpdate({ collegeId }, {
            admin: adminPermissions,
            principal: principalPermissions,
            faculty: facultyPermissions,
            student: studentPermissions,
        });

        return { message: "Permissions updated successfully" };
    }
    catch (error) {
        throw { status: 400, message: error.message };
    }
}

export default {
    welcome,
    register,
    login,
    updatePassword,
    getAllUsers,
    getUserById,
    verifyUser,
    getPermissions,
    resetPermissions,
    updatePermissions,
};
