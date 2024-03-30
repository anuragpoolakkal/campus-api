import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import courseController from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", validateUser, courseController.getCourse);
router.get("/:id", validateUser, courseController.getCourseById);
router.post("/", validateAdmin, courseController.createCourse);
router.put("/:id", validateAdmin, courseController.updateCourse);
router.delete("/:id", validateAdmin, courseController.deleteCourse);

export default router;
