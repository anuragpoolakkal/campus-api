import express from 'express';
import ProgramModel from "../models/Program.js"
import joi from "joi";
import Collegemodel from '../models/College.js';
import Departmentmodel from '../models/Department.js';
import mongoose from 'mongoose';
const router=express.Router();
// Get all programs

router.get("/", async (req, res) => {
    try {
        
        const program= await ProgramModel.find();
        if (!program) {
            return res.status(404).json({ message: "Program not found" });
        }
        res.json(program);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get program by id
router.get("/:id", async (req, res) => {
    try {
        const program = await ProgramModel.findById(req.params.id);
        if (!program) {
            return res.status(404).json({ message: "Program not found" });
        }
        res.json(program);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//create program -post
  router.post("/", async (req, res) => {
    const programSchema = joi.object({
        name: joi.string().required(),
        deptId:joi.string().required(),
        collegeId:joi.string().required(),
    
      });
    
//validate request body against programSchema
    try {
        const { value: data, error } = programSchema.validate(req.body);
  
        if (error) {
          return res.status(400).json({
            message: error.details[0].message,
            success: false,
          });
        } 
        

        if (!mongoose.Types.ObjectId.isValid(data.collegeId)) {
            return res.status(400).json({
              message: "Invalid College id",
              success: false,
            });
          }
          if (!mongoose.Types.ObjectId.isValid(data.deptId)) {
            return res.status(400).json({
              message: "Invalid department id",
              success: false,
            });
          }
          const college = await Collegemodel.findById(data.collegeId);

          if (!college) {
            return res.status(404).json({
              message: "College not found",
              success: false,
            });
          }
          
          const department = await Departmentmodel.findById(data.deptId);

          if (!department) {
            return res.status(404).json({
              message: "Department not found in college",
              success: false,
            });
          }
          
          const program = new ProgramModel({
            name: data.name, 
            deptId: data.deptId,
            collegeId: data.collegeId,
          });
          await program.save();
  
      

      res.status(200).json({
        message: "Program created successfully in the department",
        data: program,
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  });


  // update program
  router.put("/:id", async (req, res) => {
    const programSchema = joi.object({
        name: joi.string().required(),
        deptId:joi.string().required(),
        collegeId:joi.string().required(),
    
      });
    
    try {
        const { value: data, error } = programSchema.validate(req.body);
    
        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(data.collegeId)) {
          return res.status(400).json({
            message: "Invalid college id",
            success: false,
          });
        }
        if (!mongoose.Types.ObjectId.isValid(data.deptId)) {
            return res.status(400).json({
              message: "Invalid department id",
              success: false,
            });
          }
        



        const { name,deptId,collegeId } = req.body;
        const program = await ProgramModel.findByIdAndUpdate(
            req.params.id,
            { name,deptId,collegeId },
            { new: true },
        );
        if (!program) {
            return res.status(404).json({ message: "Program not found" });
        }
        res.json({ message: "Program updated successfully", data: program });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete a program by id
router.delete("/:id", async (req, res) => {
    
    try {
         const program = await ProgramModel.findByIdAndDelete(req.params.id);
        if (!program) {
            return res.status(404).json({ message: "Program not found" });
        }
         res.json({ message: "Program deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




    
    

export default router;