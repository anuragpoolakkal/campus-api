import express from "express";
import Faculty from "../models/Faculty.js";
import joi from "joi";

const router = express.Router();

const facultySchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    title: joi.string().required(),
    deptId: joi.string().required(),
    collegeId: joi.string().required(),
    userId: joi.string().required(),
    courses: joi.array().items(joi.string()).required(),
});

router.get("/faculty", async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json(faculties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/faculty/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const faculty = await Faculty.findById(id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/faculty", async (req, res) => {
    try {
        const { error } = facultySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const faculty = new Faculty(req.body);
        await faculty.save();
        res.status(201).json(faculty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/faculty/:id", async (req, res) => {
    try {
        const { error } = facultySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { id } = req.params;
        const faculty = await Faculty.findByIdAndUpdate(id, req.body, { new: true });
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        res.status(200).json(faculty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
