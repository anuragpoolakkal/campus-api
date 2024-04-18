import express from "express";
import { validateAdmin } from "../middlewares/userValidation.js";
import facultyController from "../controllers/faculty.controller.js";

const router = express.Router();

router.get("/", validateAdmin, facultyController.getFaculties);
router.get("/:id", validateAdmin, facultyController.getFacultyById);
router.post("/", validateAdmin, facultyController.createFaculty);
router.put("/:id", validateAdmin, facultyController.updateFaculty);
router.delete("/:id", validateAdmin, facultyController.deleteFaculty);

export default router;
