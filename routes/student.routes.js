import express from "express";
import studentController from "../controllers/student.controller.js";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";

const router = express.Router();

router.get("/", validateUser, studentController.getStudents);
router.get("/:id", validateUser, studentController.getStudentById);
router.post("/", validateUser, studentController.createStudent);
router.put("/:id", validateUser, studentController.updateStudent);
router.delete("/:id", validateUser, studentController.deleteStudent);

export default router;
