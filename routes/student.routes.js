import express from "express";
import studentController from "../controllers/student.controller.js";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";

const router = express.Router();

router.get("/", validateAdmin, studentController.getStudents);
router.get("/:id", validateUser, studentController.getStudentById);
router.post("/", validateAdmin, studentController.createStudent);
router.put("/:id", validateAdmin, studentController.updateStudent);
router.delete("/:id", validateAdmin, studentController.deleteStudent);

export default router;
