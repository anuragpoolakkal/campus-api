import hodService from "../services/hod.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";
import joi from "joi";

const getHods = async (req, res) => {
    try {
        const hods = await hodService.getAll(req.user.college._id);

        logger.info("HODs fetched successfully");
        return res.status(200).json({ data: hods, success: true });
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const getHodById = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const hod = await hodService.getById(id);
            logger.info("HOD fetched successfully");
            return res.status(200).json({ data: hod, success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const createHod = async (req, res) => {
    // Joi schema for request body validation
    const schema = joi.object({
        facultyId: joi.string().required(),
        departmentId: joi.string().required(),
    });

    try {
        // Validate request body against Joi schema
        const validatedData = await schema.validateAsync(req.body);

        const adminCollegeId = req.user.college._id;

        const hod = await hodService.create(validatedData, adminCollegeId);

        logger.info("HOD created successfully");
        return res.status(201).json({
            message: "HOD registered successfully",
            data: hod,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const updateHod = async (req, res) => {
    const schema = joi.object({
        facultyId: joi.string().required(),
        departmentId: joi.string().required(),
    });

    try {
        //Validate request body
        const validatedData = await schema.validateAsync(req.body);
        const { id } = req.params;

        const hod = await hodService.update(id, validatedData);

        logger.info("HOD updated successfully");
        return res.status(200).json({ data: hod, success: true });
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const deleteHod = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            await hodService.remove(id);
            logger.info("HOD deleted successfully");
            return res.status(200).json({ message: "HOD deleted successfully", success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

export default {
    getHods,
    getHodById,
    createHod,
    updateHod,
    deleteHod,
};