import express from "express";
const router = express.Router();
import CourseModel from "../models/Course.js";
import joi from "joi";
import mongoose from "mongoose";
import SemesterModel from "../models/Semester.js";
import CollegeModel from "../models/College.js";
import BatchModel from "../models/Batch.js";

const courseSchema = joi.object({
  name: joi.string().required(),
  semesterId: joi.string().required(),
  batchId: joi.string().required(),
  collegeId: joi.string().required(),
  courseCode: joi.string().required(),
});

// GET: get all courses
router.get("/", async (req, res) => {
  try {
    const course = await CourseModel.find();
    if (course.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//GET: get a course by id
router.get("/:id", async (req, res) => {
  try {
    const { value: data, error } = courseSchema.validate(req.body);
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//POST: create a course
router.post("/", async (req, res) => {
  try {
    const { value: data, error } = courseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message, success: false });
    }
    if (!mongoose.Types.ObjectId.isValid(data.semesterId)) {
      return res.status(400).json({message: "Invalid semester Id",success: false});
    }
    const semester = await SemesterModel.findById(data.semesterId);
    if (!semester) {
      return res.status(404).json({message: "semester not found",success: false });
    }
    if (!mongoose.Types.ObjectId.isValid(data.collegeId)) {
      return res.status(400).json({message: "Invalid college id",success: false});
    }
    const college = await CollegeModel.findById(data.collegeId);
    if (!college) {
      return res.status(404).json({message: "College not found",success: false });
    }
    if (!mongoose.Types.ObjectId.isValid(data.batchId)) {
      return res.status(400).json({message: "Invalid batch Id",success: false});
    }
    const batch = await BatchModel.findById(data.batchId);
    if (!batch) {
      return res.status(404).json({message: "batch not found",success: false });
    }
    const course = new CourseModel(req.body);
    await course.save();
    res.status(201).json({ message: "course created successfully", data: course, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//PUT: update a course by id
router.put("/:id", async (req, res) => {
    try {
      const { value: data, error } = courseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message, success: false });
      }
      if (!mongoose.Types.ObjectId.isValid(data.semesterId)) {
        return res.status(400).json({message: "Invalid semeseter id", success: false});
      }
      const semester = await SemesterModel.findById(data.semesterId);
      if (!semester) {
        return res.status(404).json({message: "Semester not found",success: false });
      }
      if (!mongoose.Types.ObjectId.isValid(data.collegeId)) {
        return res.status(400).json({message: "Invalid college id",success: false});
      }
      const college = await CollegeModel.findById(data.collegeId);
      if (!college) {
        return res.status(404).json({message: "College not found",success: false });
      }
      if (!mongoose.Types.ObjectId.isValid(data.batchId)) {
        return res.status(400).json({message: "Invalid batch Id",success: false});
      }
      const batch = await BatchModel.findById(data.batchId);
      if (!batch) {
        return res.status(404).json({message: "batch not found",success: false });
      }
      const { id } = req.params;
      const course = await CourseModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!course) {
        return res.status(404).json({ message: "course not found" });
      }
      res.send({ message: "course updated successfully", data: course, success: true });
      } catch (error) {
          res.status(500).json({ message: error.message, success: false });
      }
  });

export default router;