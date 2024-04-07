import joi from "joi";
import studentService from "../services/student.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";
import { isValidObjectId } from "mongoose";

const getStudents = async (req, res) => {
    try {
        const { programId, deptId } = req.query;

        let students;

        // Get students by programId
        if (programId && isValidObjectId(programId)) {
            students = await studentService.findByProgramId(programId);
        } else if (deptId && isValidObjectId(deptId)) {
            students = await studentService.findByDepartmentId(deptId);
        } else {
            students = await studentService.findAll();
        }

        logger.info("Students fetched successfully");
        return res.status(200).json({ data: students, success: true });
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const student = await studentService.findById(id);
            logger.info("Student fetched successfully");
            return res.status(200).json({ data: student, success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const createStudent = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        admNo: joi.string().required(),
        phone: joi.string().required(),
        address: joi.string(),
        rollNo: joi.string().required(),
        collegeId: joi.string().required(),
        batchId: joi.string().required(),
    });

    try {
        const { value: data, error } = schema.validate(req.body);

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        const student = await studentService.createStudent(data, req.user._id);

        logger.info("Student created successfully");
        return res.status(201).json({ data: student, success: true });
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const updateStudent = async (req, res) => {
    const schema = joi.object({
        name: joi.string().allow(""),
        admNo: joi.string().allow(""),
        phone: joi.string().allow(""),
        address: joi.string().allow(""),
        rollNo: joi.string().allow(""),
        collegeId: joi.string().allow(""),
        batchId: joi.string().allow(""),
    });

    try {
        const { value: data, error } = schema.validate(req.body);
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            throw { status: 400, message: "Invalid student id" };
        }

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        const student = await studentService.updateStudent(id, data);

        logger.info("Student updated successfully");
        return res.status(200).json({ data: student, success: true });
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            await studentService.deleteStudent(id);
            logger.info("Student deleted successfully");
            return res.status(200).json({ message: "Student deleted successfully", success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

export default {
    createStudent,
    updateStudent,
    getStudents,
    getStudentById,
    deleteStudent,
};
