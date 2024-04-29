import express from "express";
import programController from "../controllers/program.controller.js";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";

const router = express.Router();

router.get("/", validateUser, programController.getPrograms);
router.get("/:id", validateUser, programController.getProgramById);
router.post("/get-all-by-department/:id", validateUser, programController.getProgramsByDepartmentId);
router.post("/", validateUser, programController.createProgram);
router.put("/:id", validateUser, programController.updateProgram);
router.delete("/:id", validateUser, programController.deleteProgram);

export default router;
