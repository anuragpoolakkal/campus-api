import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import departmentController from "../controllers/department.controller.js";
const router = express.Router();

router.get("/", validateUser, departmentController.getDepartments);
router.get("/:id", validateUser, departmentController.getDepartmentbyID);
router.post("/", validateAdmin, departmentController.createDepartment);
router.put("/:id", validateAdmin, departmentController.updateDepartment);
router.delete("/:id", validateAdmin, departmentController.deleteDepartment);

export default router;