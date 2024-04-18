import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import semesterController from "../controllers/semester.controller.js";

const router = express.Router();

router.get("/", validateUser, semesterController.getSemesters);
router.get("/:id", validateUser, semesterController.getSemesterById);
router.post("/get-all-by-program/:id", validateUser, semesterController.getSemestersByProgramId);
router.post("/", validateAdmin, semesterController.createSemester);
router.put("/:id", validateAdmin, semesterController.updateSemester);
router.delete("/:id", validateAdmin, semesterController.deleteSemester);

export default router;
