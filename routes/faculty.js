import express from "express";
import facultyModel from "../models/Faculty.js";
import joi from "joi";

const router = express.Router();

// CREATE -- Post API
router.post("/", async (req, res) => {
    // Validation using Joi
    const facultySchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        title: joi.string().required(),
        role: joi.string().valid("hod", "tutor", "teacher").required(),
        deptId: joi.string().required(),
        collegeId: joi.string().required(),
        userId: joi.string().required(),
    });

    try {
        const { value: data, error } = facultySchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        const faculty = new facultyModel({
            name: data.name,
            email: data.email,
            title: data.title,
            role: data.role,
            deptId: data.deptId,
            collegeId: data.collegeId,
            userId: data.userId,
        });
        await faculty.save();
        res.status(201).json({
            message: "Faculty created successfully",
            success: true,
            data: faculty,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// READ -- Get all Faculty
router.get("/", async (req, res) => {
    try {
        const faculties = await facultyModel.find();

        if (!faculties || faculties.length === 0) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        res.send({ message: "Faculties found", data: faculties, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// GET by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid faculty id", success: false });
        }

        const faculty = await facultyModel.findById(id);

        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found", success: false });
        }

        res.json({ message: "Faculty found", data: faculty, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

router.put("/:id", async (req, res) => {
    const facultySchema = joi.object({
        name: joi.string(),
        email: joi.string().email(),
        title: joi.string(),
        role: joi.string().valid("hod", "tutor", "teacher"),
        deptId: joi.string(),
        collegeId: joi.string(),
        userId: joi.string(),
    });

    try {
        const { value: data, error } = facultySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }
        const { id } = req.params;
        const faculty = await facultyModel.findByIdAndUpdate(
            id,
            {
                name: data.name,
                email: data.email,
                title: data.title,
                role: data.role,
                deptId: data.deptId,
                collegeId: data.collegeId,
                userId: data.userId,
            },
            { new: true },
        );
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found", success: false });
        }
        res.status(200).json({
            message: "Faculty updated successfully",
            success: true,
            data: faculty,
        });
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid faculty id", success: false });
        }

        const faculty = await facultyModel.findByIdAndDelete(id);

        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found", success: false });
        }
        res.json({ message: "Faculty deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

export default router;
