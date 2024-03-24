import express from "express";
import College from "../models/College.js";
import joi from "joi";

const router = express.Router();

function validateCollege(college) {
    const schema = joi.object({
        name: joi.string().required(),
        address: joi.string().required(),
        phone: joi.string().required(),
        email: joi.string().email(),
        vision: joi.string(),
        mission: joi.string(),
    });
    return schema.validate(college);
}

// CREATE - POST API
router.post("/college", async (req, res) => {
    try {
        const { error } = validateCollege(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const college = new College(req.body);
        await college.save();
        res.status(201).json(college);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ BY ID - GET API
router.get("/college/:id", async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }
        res.json(college);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ALL - GET API
router.get("/college", async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE BY ID - PUT API
router.put("/college/:id", async (req, res) => {
    try {
        const { error } = validateCollege(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }
        res.json({ message: "College updated successfully", data: college });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE BY ID - DELETE API
router.delete("/college/:id", async (req, res) => {
    try {
        const college = await College.findByIdAndDelete(req.params.id);
        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }
        res.json({ message: "College deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
