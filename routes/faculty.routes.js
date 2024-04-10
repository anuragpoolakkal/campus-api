import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import facultyController from "../controllers/faculty.controller.js";

const router = express.Router();

router.get("/", validateUser, facultyController.getFaculty);
router.get("/:id", validateUser, facultyController.getFacultyById);
router.post("/", validateAdmin, facultyController.createFaculty);
router.put("/:id", validateAdmin, facultyController.updateFaculty);

export default router;
 