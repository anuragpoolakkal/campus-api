import joi from "joi";
import facultyService from "../services/faculty.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";

const getFaculty = async (req, res) => {
    try {
        const faculty = await facultyService.fetchById(req.params.id);
        //facultyService.checkFacultyBelongsToUser(req.params.id, req.user.college._id);
        logger.info(`Faculty with id ${req.params.id} fetched successfully`);
        return res.status(200).json({ data: faculty, success: true });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const getFacultyById = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const faculty = await facultyService.fetchById(id);
            return res.status(200).json({ data: faculty, success: true });
        }
    } catch (error) {
        handleError(res, error);
    }
};
const createFaculty = async (req, res) => {
    const schema = joi.object({
        name: joi.string().name(),
        email: joi.string().email(),
        title: joi.string().required(),
        role: joi.string().valid("student", "faculty", "admin", "parent").required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);
        const faculty = await facultyService.create(data, req.user._id);

        logger.info("Faculty registered successfully");

        return res.status(201).json({
            message: "Faculty registered successfully",
            data: faculty,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const updateFaculty = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email(),
        title: joi.string().required(),
        role: joi.string().valid("student", "faculty", "admin", "parent").required(),
        userId: joi.string().userId(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        //facultyService.checkFacultyBelongsToUser(req.params.id, req.user.faculty._id);

        await collegeService.update(req.params.id, data);

        logger.info("Faculty updated successfully");
        return res.status(201).json({
            message: "Faculty updated successfully",
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};
export default {
    getFaculty,
    getFacultyById,
    createFaculty,
    updateFaculty,
};