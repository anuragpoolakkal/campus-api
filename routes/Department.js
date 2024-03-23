import express from "express";
const router = express.Router();
import DepartmentModel from "../models/Department.js";

//CREATE post api

router.post("/", async (req, res) => {
    try {
        const { name, vision, mission } = req.body;
        const department = new DepartmentModel({
            name,
            vision,
            mission,
        });
        await department.save();
        res.status(201).json({ message: "department created successfully", data: department });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET : all department
router.get("/", async (req, res) => {
    try {
        const department = await DepartmentModel.find();

        if (department.length === 0) {
            return res.status(404).json({ message: "No department found" });
        }
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//GET : get by id
router.get("/:id", async (req, res) => {
    try {
        const department = await DepartmentModel.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "department not found" });
        }
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//PUT : update department by id
router.put("/:id", async (req, res) => {
    try {
        const { name, vision, mission } = req.body;
        const department = await DepartmentModel.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "department not found" });
        }
        department.name = name;
        department.vision = vision;
        department.mission = mission;
        await department.save();
        res.send({ message: "department updated successfully", data: department });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//DELETE: delete by id
router.delete("/:id", async (req, res) => {
    try {
        const department = await DepartmentModel.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "department not found" });
        }
        await department.deleteOne();
        res.json({ message: " department deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
