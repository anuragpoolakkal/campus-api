import joi from "joi";
import facultyService from "../services/faculty.service.js";
import userModel from "../models/User.js";
import { handleError } from "../utils/utils.js";
import { register } from "../services/user.service.js";
import { isValidObjectId } from "mongoose";
import facultyModel from "../models/Faculty.js";
import logger from "../utils/logger.js";
import studentModel from "../models/Student.js";

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
            logger.info("Faculty fetched successfully");
            return res.status(200).json({ data: faculty, success: true });
        }
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};
/*const createFaculty = async (req, res) => {
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
};*/



const createFaculty = async (req, res) => {
    // Joi schema for request body validation
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        title: joi.string().required(),
        role: joi.string().valid("hod", "tutor", "teacher").required(),

    });

    try {
        // Validate request body against Joi schema
        const validatedData = await schema.validateAsync(req.body);
        console.log(req.user);  // See what the user object contains at the time of error
        if (!req.user || !req.user.college) {
            logger.error("User or college data missing", { userId: req.user?._id });
            return res.status(401).json({ message: "Unauthorized or incomplete user data" });
        }
        const adminCollegeId = req.user.college._id;

       //const existingFaculty = await facultyModel.findOne({ email: validatedData.email, collegeId: adminCollegeId });
       // if (existingFaculty) {
         //   throw { status: 400, message: "A faculty with the same email already exists in this college." };
        //}*/
        /*const duplicateAdmNo = await facultyModel.findOne({
            collegeId: adminCollegeId,
        });
        if (duplicateAdmNo) {
            throw { status: 400, message: "Duplicate admission number within the same college" };
        }*/
      //  const adminCollegeId = req.user.college._id;

        //const duplicateAdmNo = await facultyModel.findOne({
          //  admNo: validatedData.admNo,
            //collegeId: adminCollegeId,
        //});
       // if (duplicateAdmNo) {
         //   throw { status: 400, message: "Duplicate admission number within the same college" };
        //}

        // Check for duplicate roll number within the same batch
       // const duplicateRollNo = await facultyModel.findOne({
         //   batchId: validatedData.batchId,
        //});
       /* if (duplicateRollNo) {
            throw { status: 400, message: "Duplicate roll number within the same batch" };
        }*/

        // Check if the user already exists
        let user = await userModel.findOne({ email: validatedData.email });

        let userId;
        if (!user) {
            // If user doesn't exist, register them
            userId = await register({ ...validatedData, role: "faculty" });
        } else {
            // If user exists, use their existing userId
            userId = user._id;
           // if (!user.role || user.role !== "faculty") {
             //   await userModel.findByIdAndUpdate(user._id, { role: "faculty" });
           // }
        }

        // Create student data
        const facultyData = {
            title: validatedData.title,
            role: validatedData.role,
          /*  rollNo: validatedData.rollNo,
            batchId: validatedData.batchId,*/
        };

        // Create student with the obtained userId
        const faculty = await facultyService.create(facultyData, userId, adminCollegeId);

        logger.info(" created successfully");
        return res.status(201).json({
            message: " registered successfully",
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
        //name: joi.string().required(),
        //email: joi.string().email(),
        name: joi.string().allow(""),
        gender: joi.string().valid("M", "F"),
        title: joi.string().required(),
        role: joi.string().valid("hod", "tutor", "teacher").required(),
        //userId: joi.string().userId(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        //facultyService.checkFacultyBelongsToUser(req.params.id, req.user.faculty._id);

        //await collegeService.update(req.params.id, data);
        const faculty = await facultyService.update(id, data);

        logger.info("Faculty updated successfully");
        return res.status(200).json({ data: faculty, success: true });
    } catch (error) {
        logger.error(error.message);
        handleError(res, error);
    }
};

        /*logger.info("Faculty updated successfully");
        return res.status(201).json({
            message: "Faculty updated successfully",
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};*/
export default {
    getFaculty,
    getFacultyById,
    createFaculty,
    updateFaculty,
};