import joi from "joi";
import { handleError } from "../utils/utils.js";
import userService from "../services/user.service.js";
import logger from "../utils/logger.js";

const welcome = async (req, res) => {
    res.send(userService.welcome());
};

const register = async (req, res) => {
    try {
        const schema = joi.object({
            name: joi.string().required(),
            gender: joi.string().valid("M", "F").required(),
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
            role: joi.string().valid("student", "faculty", "admin", "parent").required(),
        });

        const { value: data, error } = schema.validate(req.body);

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        const user = await userService.register(data);

        logger.info(`User registered successfully: ${user}`);

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        logger.error(`Error registering user: ${error}`);
        handleError(res, error);
    }
};

const login = async (req, res) => {
    try {
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
        });

        const { value: data, error } = schema.validate(req.body);

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        const { token, user } = await userService.login(data.email, data.password);

        logger.info(`User logged in successfully: ${user}`);
        res.json({ message: "Logged in successfully", token, user });
    } catch (error) {
        logger.error(`Error logging in user: ${error}`);
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

        logger.info(`Password updated successfully for ${data.email}`);

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        logger.error(`Error updating password: ${error}`);
        handleError(res, error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        logger.info(`Retrieved all users: ${users}`);
        res.status(200).json(users);
    } catch (error) {
        logger.error(`Error retrieving all users: ${error}`);
        handleError(res, error);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        logger.info(`Retrieved user by id: ${user}`);
        res.status(200).json({ data: user, sucess: true });
    } catch (error) {
        logger.error(`Error retrieving user by id: ${error}`);
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
        logger.info("user verified successfully");
        res.json({ message: "Authorized", user });
    } catch (error) {
        logger.error("user verification failed");
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
