import express from "express";
import schemeModel from "../models/Scheme.js";
import courseModel from "../models/Course.js";
import joi from "joi";
import mongoose from "mongoose";

const router = express.Router();

// Get all schemes
router.get("/", async (req, res) => {
    try {
        const scheme = await schemeModel.find();
        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }
        res.json({ data: scheme, success: true, message: "Schemes found" });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Get scheme by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid scheme id", success: false });
        }

        const scheme = await schemeModel.findById(id);

        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }

        res.json({ data: scheme, success: true, message: "Scheme found" });
        
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
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

        const course = await courseModel.findById(data.courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                success: false,
            });
        }

        const scheme = new schemeModel({
            courseId: data.courseId,
            totalMarks: data.totalMarks,
            parameters: data.parameters,
        });

        await scheme.save();

        res.status(201).json({
            message: "Scheme of the course created successfully",
            data: scheme,
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//Update a scheme by id
router.put("/:id", async (req, res) => {
    const schemeSchema = joi.object({
        courseId: joi.string(),
        totalMarks: joi.number(),
        parameters: joi.array().items(
            joi.object({
                name: joi.string(),
                weightage: joi.number().min(0).max(100),
            }),
        ),
    });

    try {
        const { value: data, error } = schemeSchema.validate(req.body);

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid scheme id", success: false });
        }

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(data.courseId)) {
            return res.status(400).json({
                message: "Invalid Course id",
                success: false,
            });
        }

        const scheme = await schemeModel.findByIdAndUpdate(
            id,
            { courseId: data.courseId, totalMarks: data.totalMarks, parameters: data.parameters },
            { new: true },
        );

        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found", success: false });
        }
        res.json({ message: "Scheme updated successfully", data: scheme, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// Delete a scheme by id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid scheme id", success: false });
        }

        const scheme = await schemeModel.findByIdAndDelete(id);

        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }
        res.json({ message: "Scheme deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

export default router;
