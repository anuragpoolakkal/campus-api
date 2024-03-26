import express from "express";
const router = express.Router();
import facultymodel from "../models/Faculty.js";

//CREATE--post API

router.post("/", async (req, res) => {
  try {
    const { name,email,title} = req.body;
    const faculty  = new facultymodel({
      name,
      email,
      title,
    });
    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -- get by id 

router.get("/:id", async (req, res) => {
    try {
        const faculty = await facultymodel.findById(req.params.id);
      if (!faculty) {
        return res.status(404).json({ message: "not found" });
      }
      res.json(faculty);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  //READ--get API
  
  router.get("/", async (req, res) => {
    try {
        const faculty = await facultymodel.find();
      if (!faculty) {
        return res.status(404).json({ message: " not found" });
      }
      res.json(faculty);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  //UPDATE--put API
  
  router.put("/:id", async (req, res) => {
    try {
      const { name,  email, title} = req.body;
      const faculty = await facultymodel.findById(req.params.id);
      if (!faculty) {
        return res.status(404).json({ message: "faculty not found" });
      }
      faculty.name = name;
      faculty.email = email;
      faculty.title = title;
      
      await faculty.save();
      res.json({ message: " updated successfully" });
      res.json(faculty);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  export default router;