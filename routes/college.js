import express from "express";
const router = express.Router();
import CollegeModel from "../models/College.js";

//CREATE--post API

router.post("/", async (req, res) => {
  try {
    const { name, address, phone, email, vision, mission } = req.body;
    const college = new CollegeModel({
      name,
      address,
      phone,
      email,
      vision,
      mission,
    });
    await college.save();
    res.status(201).json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//READ--get by id API

router.get("/:id", async (req, res) => {
  try {
    const college = await CollegeModel.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//READ--get API

router.get("/", async (req, res) => {
  try {
    const college = await CollegeModel.find();
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE--put API

router.put("/:id", async (req, res) => {
  try {
    const { name, address, phone, email, vision, mission } = req.body;
    const college = await CollegeModel.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    college.name = name;
    college.address = address;
    college.phone = phone;
    college.email = email;
    college.vision = vision;
    college.mission = mission;
    await college.save();
    res.json({ message: "College updated successfully" });
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE by id

router.delete("/:id", async (req, res) => {
  try {
    const college = await CollegeModel.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    await CollegeModel.deleteOne();
    res.json({ message: "College deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
