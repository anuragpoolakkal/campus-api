import joi from "joi";
import studentService from "../services/student.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";

const createStudent = async (req, res) => {
    try {
        const schema = joi.object({
            name: joi.string().required(),
            admNo: joi.string().required(),
            email: joi.string().email().required(),
            phone: joi.string().required(),
            address: joi.string(),
            rollNo: joi.string().required(),
            collegeId: joi.string().required(),
        });

        // Validate request body
        const { value: data, error } = schema.validate(req.body);

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        const student = await studentService.create(data, req.user._id, req.user.college._id);

        logger.info("Student registered successfully");
        res.status(201).json({
            message: "Student registered successfully",
            data: student,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const updateStudent = async (req, res) => {
    try {
        const schema = joi.object({
            name: joi.string(),
            admNo: joi.string(),
            email: joi.string().email(),
            phone: joi.string(),
            address: joi.string(),
            rollNo: joi.string(),
            collegeId: joi.string(),
        });
        const { value: data, error } = schema.validate(req.body);

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        const student = await studentService.update(req.params.id, data);

        logger.info("Student updated successfully");

        return res.status(200).json({
            message: "Student updated successfully",
            data: student,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const getStudent = async (req, res) => {
    try {
        const student = await studentService.findById(req.params.id);

        logger.info("Student fetched successfully");
        return res.status(200).json({ data: student, success: true });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await studentService.findAll();

        logger.info("Students fetched successfully");
        return res.status(200).json({ data: students, success: true });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const deleteStudent = async (req, res) => {
    try {
        await studentService.deleteById(req.params.id);
        logger.info("Student deleted successfully");
        return res.status(200).json({ message: "Student deleted successfully", success: true });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

export default {
    createStudent,
    updateStudent,
    getStudent,
    getAllStudents,
    deleteStudent,
};
