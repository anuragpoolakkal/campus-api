import joi from "joi";
import semesterService from "../services/semester.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";

const getSemesters = async (req, res) => {
    try {
        const { programId } = req.query;
        let semesters;

        if (programId) {
            // If programId is provided, filter semesters by programId
            semesters = await semesterService.getByProgramId(programId);
        } else {
            // Otherwise, get all semesters
            semesters = await semesterService.getAll(req.user.college._id);
        }

        logger.info("Semesters fetched successfully");
        return res.status(200).json({ data: semesters, success: true });
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const getSemesterById = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const semester = await semesterService.getById(id);
            logger.info("Semester fetched successfully");
            return res.status(200).json({ data: semester, success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const getSemestersByProgramId = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const semester = await semesterService.getAllByProgramId(id);
            logger.info("Semester fetched successfully");
            return res.status(200).json({ data: semester, success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

// Create a new semester
const createSemester = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        number: joi.number().integer().positive().required(),
        programId: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const semester = await semesterService.create(data, req.user.college._id);

        logger.info("Semester created successfully");
        return res.status(201).json({
            message: "Semester created successfully",
            data: semester,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Update semester
const updateSemester = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        number: joi.number().integer().positive().required(),
        programId: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const semester = await semesterService.update(req.params.id, data);
        logger.info("Semester updated successfully");
        return res.status(200).json({
            message: "Semester updated successfully",
            data: semester,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete semester
const deleteSemester = async (req, res) => {
    try {
        const semester = await semesterService.remove(req.params.id);
        logger.info("Semester deleted successfully");
        return res.status(200).json({
            message: "Semester deleted successfully",
            data: semester,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

export default {
    getSemesters,
    getSemesterById,
    getSemestersByProgramId,
    createSemester,
    updateSemester,
    deleteSemester,
};
