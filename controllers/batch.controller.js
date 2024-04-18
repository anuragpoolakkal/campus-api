import joi from "joi";
import batchService from "../services/batch.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";
import { isValidObjectId } from "mongoose";

const getBatches = async (req, res) => {
    try {
        const { programId, deptId } = req.query;

        let batches;

        // Get batches by programId
        if (programId && isValidObjectId(programId)) {
            batches = await batchService.getAllByProgramId(programId);
        } else if (deptId && isValidObjectId(deptId)) {
            batches = await batchService.getAllByDepartmentId(deptId);
        } else {
            batches = await batchService.getAll(req.user.college._id);
        }

        logger.info("Batches fetched successfully");
        return res.status(200).json({ data: batches, success: true });
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const getBatchById = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const batch = await batchService.getById(id);
            logger.info("Batch fetched successfully");
            return res.status(200).json({ data: batch, success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

// Create a new batch
const createBatch = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        programId: joi.string().required(),
        deptId: joi.string().required(),
        startYear: joi.number(),
        endYear: joi.number(),
    });

    try {
        const { value: data, error } = schema.validate(req.body);

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        const batch = await batchService.create(data, req.user._id);

        logger.info("Batch created successfully");
        return res.status(201).json({ data: batch, success: true });
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const updateBatch = async (req, res) => {
    const schema = joi.object({
        name: joi.string().allow(""),
        programId: joi.string().allow(""),
        deptId: joi.string().allow(""),
        startYear: joi.number().allow(""),
        endYear: joi.number().allow(""),
    });

    try {
        const { value: data, error } = schema.validate(req.body);
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            throw { status: 400, message: "Invalid batch id" };
        }

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        const batch = await batchService.update(id, data);

        logger.info("Batch updated successfully");
        return res.status(200).json({ data: batch, success: true });
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const deleteBatch = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const batch = await batchService.remove(id);
            logger.info("Batch deleted successfully");
            return res.status(200).json({ data: batch, success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

export default {
    getBatches,
    getBatchById,
    createBatch,
    updateBatch,
    deleteBatch,
};
