import express from "express";
import programController from "../controllers/program.controller.js";
import { validateAdmin } from "../middlewares/userValidation.js";

const router = express.Router();

router.get("/", validateAdmin, programController.getPrograms);
router.get("/:id", validateAdmin, programController.getProgramById);
router.post("/", validateAdmin, programController.createProgram);
router.put("/:id", validateAdmin, programController.updateProgram);
router.delete("/:id", validateAdmin, programController.deleteProgram);

export default router;
