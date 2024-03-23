import express from "express";
import Scheme from "../models/Scheme.js";
import Joi from "joi";

const router = express.Router();

// Get all schemes
router.get("/scheme", async (req, res) => {
    try {
        const schemes = await Scheme.find();

        if (schemes.length === 0) {
            return res.status(404).json({ message: "No schemes found" });
        }
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get scheme by id
router.get("/scheme/:id", async (req, res) => {
    try {
        const scheme = await Scheme.findById(req.params.id);
        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }
        res.json(scheme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a scheme
router.post("/scheme", async (req, res) => {
    try {
        const { totalMarks, parameters } = req.body;
        const scheme = new Scheme({
            totalMarks,
            parameters,
        });
        await scheme.save();
        res.status(201).json({ message: "Scheme created successfully", data: scheme });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a scheme by id
router.put("/scheme/:id", async (req, res) => {
    try {
        const { totalMarks, parameters } = req.body;
        const scheme = await Scheme.findByIdAndUpdate(
            req.params.id,
            { totalMarks, parameters },
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
router.delete("/scheme/:id", async (req, res) => {
    try {
        const scheme = await Scheme.findByIdAndDelete(req.params.id);
        if (!scheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }
        res.json({ message: "Scheme deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
