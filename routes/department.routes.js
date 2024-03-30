import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import DepartmentController from "../controllers/department.controller.js";
const router = express.Router();

router.get("/", validateUser, DepartmentController.getDepartment);
router.get("/:id", validateUser, DepartmentController.getDepartmentbyID);
router.post("/", validateAdmin, DepartmentController.createDepartment);
router.put("/:id", validateAdmin, DepartmentController.updateDepartment);
router.delete("/:id", validateAdmin, DepartmentController.deleteDepartment);

export default router;