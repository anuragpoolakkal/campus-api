import joi from "joi";
import courseService from "../servcies/course.service.js";
import { isValidObjectId } from "mongoose";
import { handleError } from "../utils/utils.js";

// Get course by courseId / semesterId / collegeId / courseCode
const getCourse = async (req, res) => {
    try {
        const { courseId, semesterId, collegeId, courseCode } = req.query;

        var data;

        // Get course by courseId
        if (courseId && isValidObjectId(courseId)) {
            data = await courseService.fetchById(courseId);
        }
        // Get course by semesterId
        else if (semesterId && isValidObjectId(semesterId)) {
            data = await courseService.fetchAllBySemester(semesterId, req.user.college._id);
        }
        // Get course by collegeId
        else if (collegeId && isValidObjectId(collegeId)) {
            data = await courseService.fetchAllByCollege(collegeId);
        }
        // Get course by courseCode
        else if (courseCode) {
            data = await courseService.fetchByCourseCode(courseCode);
        }
        else {
            throw { status: 400, message: "Invalid query parameters" };
        }

        return res.status(200).json({ data: data, success: true });
    }
    catch (error) {
        handleError(res, error);
    }
}

// Create a new course
const createCourse = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        semesterId: joi.string().required(),
        courseCode: joi.string().allow(""),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const course = await courseService.create(data, req.user._id, req.user.college._id);

        return res.status(201).json({
            message: "Course created successfully",
            data: course,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
}

// Update course
const updateCourse = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        semesterId: joi.string().required(),
        courseCode: joi.string().allow(""),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const course = await courseService.update(req.params.id, data, req.user.college._id);

        return res.status(200).json({
            message: "Course updated successfully",
            data: course,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
}

// Delete course
const deleteCourse = async (req, res) => {
    try {
        const course = await courseService.deleteCourse(req.params.id, req.user.college._id);

        return res.status(200).json({
            message: "Course deleted successfully",
            data: course,
            success: true,
        });
    }
    catch (error) {
        handleError(res, error);
    }
}

export default {
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}