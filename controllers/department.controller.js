import joi from "joi";
import DepartmentService from "../services/department.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";

const getDepartment = async (req, res) => {
    try {
        const department = await DepartmentService.fetchAllByCollege(req.user.college._id);
        logger.error(`Department fetched successfully`);
        return res.status(200).json({ data: department, success: true });
    } catch (error) {
        handleError(res, error);
    }
};

// Get department by departmentId
const getDepartmentbyID = async (req, res) => {
    try {
        const department = await DepartmentService.fetchById(req.params.id);

        DepartmentService.checkDepartmentUserCollege(req.params.id, req.user.college._id);

        return res.status(200).json({ data: department, success: true });
    } catch (error) {
        handleError(res, error);
    }
};

// Create a new college and assign it to the admin
const createDepartment = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        collegeId: joi.string().required(),
        vision: joi.string().required(),
        mission: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const department = await DepartmentService.create(data, data.collegeId);

        return res.status(201).json({
            message: "Department registered successfully",
            data: department,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const updateDepartment = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        collegeId: joi.string().required(),
        vision: joi.string().required(),
        mission: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const department = await DepartmentService.update(req.params.id, data, data.collegeId);

        return res.status(200).json({
            message: "Department updated successfully",
            data: department,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const department = await DepartmentService.deleteDepartment(req.params.id);

        return res.status(200).json({
            message: "Department deleted successfully",
            data: department,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

export default {
    getDepartment,
    getDepartmentbyID,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};
