import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import courseController from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", validateUser, courseController.getCourses);
router.get("/:id", validateUser, courseController.getCourseById);
router.post("/", validateUser, courseController.createCourse);
router.put("/:id", validateUser, courseController.updateCourse);
router.delete("/:id", validateUser, courseController.deleteCourse);

export default router;

