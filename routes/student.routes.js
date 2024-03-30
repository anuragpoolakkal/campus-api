import express from "express";
import studentController from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.get("/:id", studentController.getStudent);
router.get("/", studentController.getAllStudents);
router.delete("/:id", studentController.deleteStudent);

export default router;
