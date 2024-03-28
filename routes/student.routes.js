import express from "express";
import mongoose from "mongoose";
import studentModel from "../models/Student.js";
import batchModel from "../models/Batch.js";
import collegeModel from "../models/College.js";
import userModel from "../models/User.js";
import joi from "joi";

const router = express.Router();

const StudentSchema = joi.object({
    name: joi.string().required(),
    admNo: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().required(),
    address: joi.string(),
    rollNo: joi.string().required(),
    batchId: joi.string().required(),
    collegeId: joi.string().required(),
    userId: joi.string().required(),
});

// CREATE - POST API
router.post("/", async (req, res) => {
    try {
        const { value: data, error } = StudentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        if (
            !mongoose.Types.ObjectId.isValid(data.batchId) ||
            !mongoose.Types.ObjectId.isValid(data.collegeId) ||
            !mongoose.Types.ObjectId.isValid(data.userId)
        ) {
            return res.status(400).json({ message: "Invalid IDs", success: false });
        }

        const batch = await batchModel.findById(data.batchId);
        if (!batch) {
            return res.status(404).json({ message: "Batch not found", success: false });
        }

        const college = await collegeModel.findById(data.collegeId);
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }

        const user = await User.findById(data.userId);
        if (!user || user.type !== "student") {
            return res
                .status(404)
                .json({ message: "Invalid user or not a student", success: false });
        }

        const student = new studentModel({
            name: data.name,
            admNo: data.admNo,
            email: data.email,
            phone: data.phone,
            address: data.address,
            rollNo: data.rollNo,
            batchId: data.batchId,
            collegeId: data.collegeId,
            userId: data.userId,
        });

        await student.save();

        res.status(201).json({
            message: "Student registered successfully",
            data: student,
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Update by ID (PUT) API
router.put("/:id", async (req, res) => {
    try {
        const { value: data, error } = StudentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        if (
            !mongoose.Types.ObjectId.isValid(data.batchId) ||
            !mongoose.Types.ObjectId.isValid(data.collegeId) ||
            !mongoose.Types.ObjectId.isValid(data.userId)
        ) {
            return res.status(400).json({ message: "Invalid IDs", success: false });
        }

        const batch = await Batch.findById(data.batchId);
        if (!batch) {
            return res.status(404).json({ message: "Batch not found", success: false });
        }

        const college = await collegeModel.findById(data.collegeId);
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }

        const user = await User.findById(data.userId);
        if (!user || user.type !== "student") {
            return res
                .status(404)
                .json({ message: "Invalid user or not a student", success: false });
        }

        const student = await studentModel.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found", success: false });
        }

        Object.assign(student, {
            name: data.name,
            admNo: data.admNo,
            email: data.email,
            phone: data.phone,
            address: data.address,
            rollNo: data.rollNo,
            batchId: data.batchId,
            collegeId: data.collegeId,
            userId: data.userId,
        });

        await student.save();

        res.json({ message: "Student updated successfully", data: student, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// READ BY ID - GET API
router.get("/:id", async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ALL - GET API
router.get("/", async (req, res) => {
    try {
        const students = await studentModel.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE BY ID - DELETE API
router.delete("/:id", async (req, res) => {
    try {
        const student = await studentModel.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Studentdeleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
