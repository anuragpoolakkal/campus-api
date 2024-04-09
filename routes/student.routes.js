import express from "express";
import studentController from "../controllers/student.controller.js";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";

const router = express.Router();

router.post("/", validateAdmin, studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.get("/:id", studentController.getStudentById);
router.get("/", validateAdmin, studentController.getStudents);
router.delete("/:id", studentController.deleteStudent);

export default router;
