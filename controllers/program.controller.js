import programService from "../services/program.service.js";
import joi from "joi";
import logger from "../utils/logger.js";
import { handleError } from "../utils/utils.js";

const getPrograms = async (req, res) => {
    try {
        const programs = await programService.getAll(req.user.college._id);
        logger.info(`Programs fetched successfully: ${programs}`);
        res.json({ data: programs, message: "programs fetched successfully", success: true });
    } catch (error) {
        logger.error(`Error fetching programs: ${error}`);
        handleError(res, error);
    }
};

const getProgramById = async (req, res) => {
    try {
        const { id } = req.params;
        const program = await programService.getById(id);
        if (!program) {
            return res.status(404).json({ message: "Program not found", success: false });
        }
        logger.info(`Program found: ${program}`);
        res.json({ message: "Program found", data: program, success: true });
    } catch (error) {
        logger.error(`Error fetching program by ID: ${error}`);
        handleError(res, error);
    }
};

const createProgram = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        hodId: joi.string().required(),
    });

    try {
        const validatedData = await schema.validateAsync(req.body);

        const program = await programService.create(validatedData, req.user.college._id);

        logger.info(`Program created successfully: ${program}`);
        res.status(200).json({
            message: "Program created successfully",
            data: program,
            success: true,
        });
    } catch (error) {
        logger.error(`Error creating program: ${error}`);
        handleError(res, error);
    }
};

const updateProgram = async (req, res) => {
    const programSchema = joi.object({
        name: joi.string().required(),
        hodId: joi.string().required(),
    });

    try {
        const { id } = req.params;
        const { value: data, error } = programSchema.validate(req.body);
        if (error) {
            throw { status: 400, message: error.details[0].message };
        }
        const program = await programService.update(id, data, req.user.college._id);
        if (!program) {
            throw { status: 404, message: "Program not found" };
        }
        logger.info(`Program updated successfully: ${program}`);
        res.json({ message: "Program updated successfully", data: program, success: true });
    } catch (error) {
        logger.error(`Error updating program: ${error}`);
        handleError(res, error);
    }
};

const deleteProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const program = await programService.remove(id);
        if (!program) {
            throw { status: 404, message: "Program not found" };
        }
        logger.info(`Program deleted successfully: ${program}`);
        res.json({ message: "Program deleted successfully", success: true });
    } catch (error) {
        logger.error(`Error deleting program: ${error}`);
        handleError(res, error);
    }
};

const getProgramsByDepartmentId = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const semester = await programService.getAllByDepartmentId(id);
            logger.info("Programs fetched successfully");
            return res.status(200).json({ data: semester, success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

export default {
    getPrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram,
    getProgramsByDepartmentId
};
