import express from "express";
import schememodel from "../models/Scheme.js";
const router = express.Router();
//Get:Get all schemes
router.get("/", async (req, res) => {
  try {
    const scheme = await schememodel.find();

    if (scheme.length === 0) {
      return res.status(404).json({ message: "No  schemes found" });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get scheme by id
router.get("/:id", async (req, res) => {
  try {
    const scheme = await schememodel.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//post: create a scheme
router.post("/", async (req, res) => {
  try {
    const { totalMarks, parameters } = req.body;
    const scheme = new schememodel({
      totalMarks,
      parameters,
    });
    await scheme.save();
    res.send({ message: "Scheme created successfully", data: scheme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//put: update a scheme by id
router.put("/:id", async (req, res) => {
  try {
    const { totalMarks, parameters } = req.body;
    const scheme = await schememodel.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    scheme.totalMarks = totalMarks;
    scheme.parameters = parameters;
    await scheme.save();
    res.send({ message: "Scheme updated successfully", data: scheme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete scheme by id

router.delete("/:id", async (req, res) => {
  try {
    const scheme = await schememodel.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    await scheme.deleteOne();
    res.json({ message: " Scheme deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
