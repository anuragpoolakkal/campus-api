import joi from "joi";
import departmentService from "../services/department.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";

const getDepartments = async (req, res) => {
    try {
        const department = await departmentService.getAllByCollege(req.user.college._id);
        logger.error(`Department fetched successfully`);
        return res.status(200).json({ data: department, success: true });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

// Get department by departmentId
const getDepartmentbyId = async (req, res) => {
    try {
        const department = await departmentService.fetchById(req.params.id);
        logger.error(`Department fetched successfully`);
        //DepartmentService.checkDepartmentUserCollege(req.params.id, req.user.college._id);

        return res.status(200).json({ data: department, success: true });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

// Create a new college and assign it to the admin
const createDepartment = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        vision: joi.string().required(),
        mission: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const department = await departmentService.create(data, req.user._id, req.user.college._id);
        logger.info("Department created successfully");
        return res.status(201).json({
            message: "Department registered successfully",
            data: department,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const updateDepartment = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        vision: joi.string().required(),
        mission: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const department = await departmentService.update(
            req.params.id,
            data,
            req.user.college._id,
        );

        logger.info("Department updated successfully");

        return res.status(200).json({
            message: "Department updated successfully",
            data: department,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const department = await departmentService.remove(req.params.id);

        logger.info("Department deleted successfully");

        return res.status(200).json({
            message: "Department deleted successfully",
            data: department,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

export default {
    getDepartments,
    getDepartmentbyId,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};
