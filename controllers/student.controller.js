import joi from "joi";
import { register } from "../services/user.service.js";
import userModel from "../models/User.js";
import studentModel from "../models/Student.js";
import studentService from "../services/student.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";
import { isValidObjectId } from "mongoose";

const getStudents = async (req, res) => {
    try {
        const { programId, deptId } = req.query;

        let students;

        // if (programId && isValidObjectId(programId)) {
        //     students = await studentService.findByProgramId(programId);
        // } else if (deptId && isValidObjectId(deptId)) {
        //     students = await studentService.findByDepartmentId(deptId);
        // } else {
        students = await studentService.getAll(req.user.college._id);
        // }

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
            const student = await studentService.getById(id);
            logger.info("Student fetched successfully");
            return res.status(200).json({ data: student, success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

const createStudent = async (req, res) => {
    // Joi schema for request body validation
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        gender: joi.string().valid("M", "F").required(),
        admNo: joi.string().required(),
        phone: joi.string().required(),
        address: joi.string().required(),
        rollNo: joi.string().required(),
        batchId: joi.string().required(),
    });

    try {
        // Validate request body against Joi schema
        const validatedData = await schema.validateAsync(req.body);
        const adminCollegeId = req.user.college._id;

        const duplicateAdmNo = await studentModel.findOne({
            admNo: validatedData.admNo,
            collegeId: adminCollegeId,
        });
        if (duplicateAdmNo) {
            throw { status: 400, message: "Duplicate admission number within the same college" };
        }

        // Check for duplicate roll number within the same batch
        const duplicateRollNo = await studentModel.findOne({
            rollNo: validatedData.rollNo,
            batchId: validatedData.batchId,
        });
        if (duplicateRollNo) {
            throw { status: 400, message: "Duplicate roll number within the same batch" };
        }

        // Check if the user already exists
        let user = await userModel.findOne({ email: validatedData.email });

        let userId;
        if (!user) {
            // If user doesn't exist, register them
            userId = await register({ ...validatedData, role: "student" });
        } else {
            // If user exists, use their existing userId
            userId = user._id;
            if (!user.role || user.role !== "student") {
                await userModel.findByIdAndUpdate(user._id, { role: "student" });
            }
        }

        // Create student data
        const studentData = {
            admNo: validatedData.admNo,
            phone: validatedData.phone,
            address: validatedData.address,
            rollNo: validatedData.rollNo,
            batchId: validatedData.batchId,
        };

        // Create student with the obtained userId
        const student = await studentService.create(studentData, userId, adminCollegeId);

        logger.info("Student created successfully");
        return res.status(201).json({
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
    const schema = joi.object({
        name: joi.string().allow(""),
        gender: joi.string().valid("M", "F"),
        admNo: joi.string().allow(""),
        phone: joi.string().allow(""),
        address: joi.string().allow(""),
        rollNo: joi.string().allow(""),
        batchId: joi.string().allow(""),
    });

    try {
        const { value: data, error } = schema.validate(req.body);
        const { id } = req.params;
        const adminCollegeId = req.user.college._id;

        if (!isValidObjectId(id)) {
            throw { status: 400, message: "Invalid student id" };
        }

        if (error) {
            throw { status: 400, message: error.details[0].message };
        }

        // Check for duplicate admission number within the same college
        if (data.admNo) {
            const duplicateAdmNo = await studentModel.findOne({
                admNo: data.admNo,
                collegeId: adminCollegeId,
                _id: { $ne: id }, // Exclude the current student being updated
            });
            if (duplicateAdmNo) {
                throw {
                    status: 400,
                    message: "Duplicate admission number within the same college",
                };
            }
        }

        // Check for duplicate roll number within the same batch
        if (data.rollNo) {
            const duplicateRollNo = await studentModel.findOne({
                rollNo: data.rollNo,
                batchId: data.batchId,
                _id: { $ne: id }, // Exclude the current student being updated
            });
            if (duplicateRollNo) {
                throw { status: 400, message: "Duplicate roll number within the same batch" };
            }
        }

        const student = await studentService.update(id, data);

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
            await studentService.remove(id);
            logger.info("Student deleted successfully");
            return res.status(200).json({ message: "Student deleted successfully", success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

export default {
    getStudents,
    createStudent,
    updateStudent,
    getStudentById,
    deleteStudent,
};
