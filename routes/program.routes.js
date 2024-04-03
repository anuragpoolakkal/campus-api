import express from "express";
import programController from "../controllers/program.controller.js";

const router = express.Router();

router.get("/", programController.getAllPrograms);
router.get("/:id", programController.getProgramById);
router.post("/", programController.createProgram);
router.put("/:id", programController.updateProgram);
router.delete("/:id", programController.deleteProgram);

export default router;
