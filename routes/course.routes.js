import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
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

router.post("/get-by-id", validateUser, getCourseById);
router.post("/get-by-semester", validateUser, getCoursesBySemester);
router.post("/get-by-college", validateUser, getCoursesByCollege);
router.post("/get-by-course-code", validateUser, getCoursesByCourseCode);
router.post("/create", validateAdmin, createCourse);
router.post("/update", validateAdmin, updateCourse);
router.post("/delete", validateAdmin, deleteCourse);

export default router;
