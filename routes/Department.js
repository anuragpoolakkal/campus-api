import express from "express";
const router = express.Router();
import DepartmentModel from "../models/Department.js";
import joi from "joi";
import mongoose from "mongoose";
import CollegeModel from "../models/College.js";

const departmentSchema = joi.object({
  name: joi.string().required(),
  collegeId: joi.string().required(),
  vision: joi.string().required(),
  mission: joi.string().required(),
});

//CREATE post api

router.post("/", async (req, res) => {
  try {
    const { value: data, error } = departmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message, success: false });
    }
    if (!mongoose.Types.ObjectId.isValid(data.collegeId)) {
      return res.status(400).json({message: "Invalid college id",success: false});
    }
    const college = await CollegeModel.findById(data.collegeId);
    if (!college) {
      return res.status(404).json({message: "College not found",success: false });
    }
    const department = new DepartmentModel(req.body);
    await department.save();
    res.status(201).json({ message: "department created successfully", data: department, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// GET : all department
router.get("/", async (req, res) => {
  try {
    const department = await DepartmentModel.find();
    if (department.length === 0) {
      return res.status(404).json({ message: "No department found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//GET : get by id
router.get("/:id", async (req, res) => {
  try {
    const { value: data, error } = departmentSchema.validate(req.body);
    const department = await DepartmentModel.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//PUT : update department by id
router.put("/:id", async (req, res) => {
  try {
    const { value: data, error } = departmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message, success: false });
    }
    if (!mongoose.Types.ObjectId.isValid(data.collegeId)) {
      return res.status(400).json({message: "Invalid college id", success: false});
    }
    const college = await CollegeModel.findById(data.collegeId);
    if (!college) {
      return res.status(404).json({message: "College not found",success: false });
    }
    const { id } = req.params;
    const department = await DepartmentModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!department) {
      return res.status(404).json({ message: "department not found" });
    }
    res.send({ message: "department updated successfully", data: department, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
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
    res.json({ message: " department deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export default router;
