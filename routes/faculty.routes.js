import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import facultyController from "../controllers/faculty.controller.js";

const router = express.Router();

router.get("/",  facultyController.getFaculty);
router.get("/:id",  facultyController.getFacultyById);
router.post("/",  facultyController.createFaculty);
router.put("/:id",  facultyController.updateFaculty);

export default router;
 