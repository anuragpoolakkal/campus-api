import joi from "joi";
import collegeService from "../services/college.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";

// Get college by collegeId
const getCollege = async (req, res) => {
    try {
        const college = await collegeService.getById(req.params.id);
        collegeService.checkCollegeBelongsToUser(req.params.id, req.user.college._id);
        logger.info(`College with id ${req.params.id} fetched successfully`);
        return res.status(200).json({ data: college, success: true });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

// Create a new college and assign it to the admin
const createCollege = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        address: joi.string().required(),
        phone: joi.string().required(),
        email: joi.string().email(),
        vision: joi.string(),
        mission: joi.string(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        // Check if the admin already has a college
        if (req.user.admin || req.user.college) {
            throw { status: 400, message: "Admin already has a college" };
        }

        const college = await collegeService.create(data, req.user._id);

        logger.info("College registered successfully");

        return res.status(201).json({
            message: "College registered successfully",
            data: college,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

// Update college details
const updateCollege = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        address: joi.string().required(),
        phone: joi.string().required(),
        email: joi.string().email(),
        vision: joi.string(),
        mission: joi.string(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        collegeService.checkCollegeBelongsToUser(req.params.id, req.user.college._id);

        await collegeService.update(req.params.id, data);

        logger.info("College updated successfully");
        return res.status(201).json({
            message: "College updated successfully",
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

// Delete college
const deleteCollege = async (req, res) => {
    try {
        const college = await collegeService.getById(req.params.id);
        if (!college) {
            throw { status: 404, message: "College not found" };
        }

        collegeService.checkCollegeBelongsToUser(req.params.id, req.user.college._id);

        await collegeService.remove(req.params.id);

        logger.info("College deleted successfully");
        return res.status(200).json({ message: "College deleted successfully", success: true });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const getAllCounts = async (req, res) => {
    try {
        const counts = await collegeService.getAllCounts(req.user.college._id);
        logger.info("Counts fetched successfully"); 
        return res.status(200).json({ data: counts, success: true });
    } catch (error) {
        console.log(req.user)
        logger.error(error);
        handleError(res, error);
    }
};

export default {
    getCollege,
    getAllCounts,
    createCollege,
    updateCollege,
    deleteCollege,
};
