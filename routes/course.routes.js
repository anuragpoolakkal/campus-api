import express from "express";
//Middlewares
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
//Import functions from controller
import {
    createCourse,
    deleteCourse,
    getCourseById,
    getCoursesByCollege,
    getCoursesByCourseCode,
    getCoursesBySemester,
    updateCourse
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/get-by-id", validateUser, getCourseById); // Get course by courseId (Any user belonging to the college can access this route)
router.post("/get-by-semester", validateUser, getCoursesBySemester); // Get courses by semester
router.post("/get-by-college", validateUser, getCoursesByCollege); // Get courses by collegeId
router.post("/get-by-course-code", validateUser, getCoursesByCourseCode); // Get courses by courseCode 
router.post("/create", validateAdmin, createCourse); // Create a new course (Only admin can access this route)
router.post("/update", validateAdmin, updateCourse); // Update course details
router.post("/delete", validateAdmin, deleteCourse); // Delete course

export default router;
