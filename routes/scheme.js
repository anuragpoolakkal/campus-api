import express from "express";
import SchemeModel from "../models/Scheme.js";
import CourseModel from "../models/Course.js";

import joi from "joi";
import mongoose from "mongoose";
const router = express.Router();

// Get all schemes
router.get("/", async (req, res) => {
    try {
        const scheme = await SchemeModel.find();
        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }
        res.json(scheme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get scheme by id
router.get("/:id", async (req, res) => {
    try {
        const scheme = await SchemeModel.findById(req.params.id);
        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }
        res.json(scheme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Create a scheme:POST
router.post("/", async (req, res) => {
    const schemeSchema = joi.object({
        courseId: joi.string().required(),
        totalMarks: joi.number().required(),
        parameters: joi
            .array()
            .items(
                joi.object({
                    name: joi.string().required(),
                    weightage: joi.number().required().min(0).max(100),
                }),
            )
            .required(),
    });
    //validate request body against schemeSchema
    try {
        const { value: data, error } = schemeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }
        if (!mongoose.Types.ObjectId.isValid(data.courseId)) {
            return res.status(400).json({
                message: "Invalid Course id",
                success: false,
            });
        }

        const course = await CourseModel.findById(data.courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                success: false,
            });
        }
        const scheme = new SchemeModel({
            courseId: data.courseId,
            totalMarks: data.totalMarks,
            parameters: data.parameters,
        });
        await scheme.save();

        res.status(201).json({
            message: "Scheme of the course created successfully",
            data: scheme,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update a scheme by id
router.put("/:id", async (req, res) => {
    const schemeSchema = joi.object({
        courseId: joi.string().required(),
        totalMarks: joi.number().required(),
        parameters: joi
            .array()
            .items(
                joi.object({
                    name: joi.string().required(),
                    weightage: joi.number().required().min(0).max(100),
                }),
            )
            .required(),
    });
    try {
        const { value: data, error } = schemeSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(data.courseId)) {
            return res.status(400).json({
                message: "Invalid Course id",
                success: false,
            });
        }

        const { courseId, totalMarks, parameters } = req.body;
        const scheme = await SchemeModel.findByIdAndUpdate(
            req.params.id,
            { courseId, totalMarks, parameters },
            { new: true },
        );
        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }
        res.json({ message: "Scheme updated successfully", data: scheme });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a scheme by id
router.delete("/:id", async (req, res) => {
    try {
        const scheme = await SchemeModel.findByIdAndDelete(req.params.id);
        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }
        res.json({ message: "Scheme deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
