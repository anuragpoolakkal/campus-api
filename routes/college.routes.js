import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import {
    getCollegeById,
    createCollege,
    updateCollege,
    deleteCollege
} from "../controllers/college.controller.js";

const router = express.Router();

router.post("/get-by-id", validateUser, getCollegeById);
router.post("/create", validateAdmin, createCollege); 
router.post("/update", validateAdmin, updateCollege); 
router.post("/delete", validateAdmin, deleteCollege); 

export default router;
