import { handleError } from "../utils/utils";
import userService from "../services/userService.js";

const welcome = async (req, res) => {
    res.send(userService.welcome());
};

const register = async (req, res) => {
    try {
        const signupSchema = joi.object({
            name: joi.string().required(),
            gender: joi.string().valid("M", "F").required(),
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
            role: joi.string().valid("student", "faculty", "admin", "parent").required(),
        });

        const { value: data, error } = signupSchema.validate(req.body);

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        const user = await userService.register(data);

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        handleError(res, error);
    }
};

const login = async (req, res) => {
    try {
        const loginSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
        });

        const { value: data, error } = loginSchema.validate({ email, password });

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        const { token, user } = await userService.login(data.email, data.password);

        res.json({ message: "Logged in successfully", token, user });
    } catch (error) {
        handleError(res, error);
    }
};

const updatePassword = async (req, res) => {
    try {
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

        await userService.updatePassword(data.email, data.oldPassword, data.newPassword);
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
