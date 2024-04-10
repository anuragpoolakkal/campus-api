import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import collegeController from "../controllers/college.controller.js";

const router = express.Router();

router.get("/:id", validateUser, collegeController.getCollege);
router.post("/get-all-count", validateAdmin, collegeController.getAllCounts);
router.post("/", validateAdmin, collegeController.createCollege);
router.put("/:id", validateAdmin, collegeController.updateCollege);
router.delete("/:id", validateAdmin, collegeController.deleteCollege);

export default router;
