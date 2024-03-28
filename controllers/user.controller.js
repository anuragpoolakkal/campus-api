import { handleError } from "../utils/utils";
import userService from "../services/userService.js";

const welcome = async (req, res) => {
    res.send(userService.welcome());
};

const register = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        handleError(res, error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await userService.login(email, password);
        res.json({ message: "Logged in successfully", token, user });
    } catch (error) {
        handleError(res, error);
    }
};

const updatePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        await userService.updatePassword(email, oldPassword, newPassword);
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        handleError(res, error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        handleError(res, error);
    }
};

const verifyUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw { status: 401, message: "Unauthorized" };
        }
        const user = await userService.verifyUser(token);
        res.json({ message: "Authorized", user });
    } catch (error) {
        handleError(res, error);
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
