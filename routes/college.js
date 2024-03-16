import express from "express";
import CollegeModel from "../models/College.js";

const router = express.Router();

// GET all colleges
router.get("/", async (req, res) => {
  try {
    const colleges = await CollegeModel.find();

    if (colleges.length === 0) {
      return res.status(404).json({ message: "No colleges found" });
    }
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific college by ID
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

// POST a new college
router.post("/", async (req, res) => {
  try {
    const { name, address, phone, email, vision, mission } = req.body
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

// PUT (replace) a specific college by ID
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
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE a specific college by ID
router.delete("/:id", async (req, res) => {
  try {
    const college = await CollegeModel.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    await college.remove();
    res.json({ message: "College deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
