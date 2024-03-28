import express from "express";
//Middlewares
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
//Import functions from controller
import {
    getCollegeById,
    createCollege,
    updateCollege,
    deleteCollege
} from "../controllers/college.controller.js";

const router = express.Router();

router.post("/get-by-id", validateUser, getCollegeById); // Get college by collegeId (Any user belonging to the college can access this route)
router.post("/create", validateAdmin, createCollege); // Create a new college and assign it to the admin (Only admin can access this route)
router.post("/update", validateAdmin, updateCollege); // Update college details
router.post("/delete", validateAdmin, deleteCollege); // Delete college

export default router;
