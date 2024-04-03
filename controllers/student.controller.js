import joi from "joi";
import studentService from "../services/student.service.js";
import { handleError } from "../utils/utils.js";

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
            userId: joi.string().required(),
        });

        // Validate request body
        const data = await schema.validateAsync(req.body);

        const student = await studentService.create(data, req.user._id, req.user.college._id);

        res.status(201).json({
            message: "Student registered successfully",
            data: student,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const updateStudent = async (req, res) => {
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
        const { value: data, error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        const student = await studentService.update(req.params.id, data);

        return res.status(200).json({
            message: "Student updated successfully",
            data: student,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const getStudent = async (req, res) => {
    try {
        const student = await studentService.findById(req.params.id);

        return res.status(200).json({ data: student, success: true });
    } catch (error) {
        handleError(res, error);
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await studentService.findAll();

        return res.status(200).json({ data: students, success: true });
    } catch (error) {
        handleError(res, error);
    }
};

const deleteStudent = async (req, res) => {
    try {
        await studentService.deleteById(req.params.id);

        return res.status(200).json({ message: "Student deleted successfully", success: true });
    } catch (error) {
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
