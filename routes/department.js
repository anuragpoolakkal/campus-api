import express from "express";
import Department from "../models/Department.js";
import Joi from "joi";

const router = express.Router();

// GET all departments
router.get("/department", async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific department by ID
router.get("/department/:id", async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.json(department);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a new department
router.post("/department", async (req, res) => {
    try {
        const { name, code } = req.body;
        const department = new Department({ name, code });
        const newDepartment = await department.save();
        res.status(201).json(newDepartment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a specific department by ID
router.put("/department/:id", async (req, res) => {
    try {
        const { name, code } = req.body;
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        department.name = name;
        department.code = code;

        const updatedDepartment = await department.save();
        res.json(updatedDepartment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a specific department by ID
router.delete("/department/:id", async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        await department.remove();
        res.json({ message: "Department deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
