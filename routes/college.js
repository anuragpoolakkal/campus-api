import express from "express";
import mongoose from "mongoose";
import collegeModel from "../models/College.js";
import userModel from "../models/User.js";
import joi from "joi";

const router = express.Router();

const CollegeSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().email(),
    vision: joi.string(),
    mission: joi.string(),
    adminId: joi.string().required(),
});

// CREATE - POST API
router.post("/", async (req, res) => {
    try {
        const { value: data, error } = CollegeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(data.adminId)) {
            return res.status(400).json({ message: "Invalid admin id", success: false });
        }

        const admin = await userModel.findById(data.adminId);

        if (!admin || admin.type !== "admin") {
            return res
                .status(404)
                .json({ message: "Invalid admin or not authorized", success: false });
        }

        if (admin.college) {
            return res.status(400).json({ message: "Admin already has a college", success: false });
        }

        const college = new collegeModel({
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            vision: data.vision,
            mission: data.mission,
            adminId: data.adminId,
        });

        await college.save();
        //admin.college = college._id;
        //await admin.save();

        res.status(201).json({
            message: "College registered successfully",
            data: college,
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// UPDATE - PUT API
router.put("/:id", async (req, res) => {
    try {
        const { value: data, error } = CollegeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(data.adminId)) {
            return res.status(400).json({ message: "Invalid admin id", success: false });
        }

        const college = await collegeModel.findById(req.params.id);

        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }

        Object.assign(college, data);

        await college.save();

        res.json({ message: "College updated successfully", data: college, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// DELETE BY ID - DELETE API
router.delete("/:id", async (req, res) => {
    try {
        const college = await collegeModel.findByIdAndDelete(req.params.id);
        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }
        res.json({ message: "College deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ BY ID - GET API
router.get("/:id", async (req, res) => {
    try {
        const college = await collegeModel.findById(req.params.id);
        if (!college) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(college);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ALL - GET API
router.get("/", async (req, res) => {
    try {
        const colleges = await collegeModel.find();
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
