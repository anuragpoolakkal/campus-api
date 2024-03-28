import joi from "joi";
//Models
import Course from "../models/Course";
import Semester from "../models/Semester";

// Get course by courseId
const getCourseById = async (req, res) => {
    const schema = joi.object({
        courseId: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const course = await Course.findById(data.courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found", success: false });
        }

        //Check if the course and user belongs to the same college
        if (course.collegeId != req.user.college._id) { // Refer to validateAdmin in middleware/uservaldation.js
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        res.status(200).json({ data: course, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

// Get courses by semesterId
const getCoursesBySemester = async (req, res) => {
    const schema = joi.object({
        semesterId: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const course = await Course.findOne({ semesterId: data.semesterId });
        if (!course) {
            return res.status(404).json({ message: "Course not found", success: false });
        }

        //Check if the course and user belongs to the same college
        if (course.collegeId != req.user.college._id) { // Refer to validateAdmin in middleware/uservaldation.js
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        res.status(200).json({ data: course, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

// Get courses by collegeId
const getCoursesByCollege = async (req, res) => {
    const schema = joi.object({
        collegeId: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const course = await Course.findOne({ collegeId: data.collegeId });
        if (!course) {
            return res.status(404).json({ message: "Course not found", success: false });
        }

        //Check if the course and user belongs to the same college
        if (course.collegeId != req.user.college._id) { // Refer to validateAdmin in middleware/uservaldation.js
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        res.status(200).json({ data: course, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

// Get courses by courseCode
const getCoursesByCourseCode = async (req, res) => {
    const schema = joi.object({
        courseCode: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const course = await Course.findOne({ courseCode: data.courseCode });
        if (!course) {
            return res.status(404).json({ message: "Course not found", success: false });
        }

        //Check if the course and user belongs to the same college
        if (course.collegeId != req.user.college._id) { // Refer to validateAdmin in middleware/uservaldation.js
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        res.status(200).json({ data: course, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
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
        const semester = await Semester.findById(data.semesterId);
        if (!semester) {
            return res.status(404).json({ message: "Semester not found", success: false });
        }

        const course = new Course({
            name: data.name,
            semesterId: data.semesterId,
            courseCode: data.courseCode,
            collegeId: req.user.college._id,
        });

        await course.save();

        return res.status(201).json({
            message: "Course created successfully",
            data: course,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

// Update course
const updateCourse = async (req, res) => {
    const schema = joi.object({
        courseId: joi.string().required(),
        name: joi.string().required(),
        semesterId: joi.string().required(),
        courseCode: joi.string().allow(""),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const course = await Course.findById(data.courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found", success: false });
        }

        const semester = await Semester.findById(data.semesterId);
        if (!semester) {
            return res.status(404).json({ message: "Semester not found", success: false });
        }

        //Check if the course and user belongs to the same college
        if (course.collegeId != req.user.college._id) { // Refer to validateAdmin in middleware/uservaldation.js
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        await Course.findByIdAndUpdate(data.courseId, {
            name: data.name,
            semesterId: data.semesterId,
            courseCode: data.courseCode,
        });

        return res.status(200).json({
            message: "Course updated successfully",
            data: course,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

// Delete course
const deleteCourse = async (req, res) => {
    const schema = joi.object({
        courseId: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const course = await Course.findById(data.courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found", success: false });
        }

        //Check if the course and user belongs to the same college
        if (course.collegeId != req.user.college._id) { // Refer to validateAdmin in middleware/uservaldation.js
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        await Course.findByIdAndDelete(data.courseId);

        return res.status(200).json({
            message: "Course deleted successfully",
            data: course,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export {
    getCourseById,
    getCoursesBySemester,
    getCoursesByCollege,
    getCoursesByCourseCode,
    createCourse,
    updateCourse,
    deleteCourse
}