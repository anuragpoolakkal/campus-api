import joi from "joi";
import schemeService from '../services/scheme.service.js'


import {isValidObjectId} from "mongoose";

import { handleError } from "../utils/utils.js";


const getSchemeByCourse= async (req,res)=>{

try{


  const {courseId} =req.query;
  var scheme;

  
  if( courseId && isValidObjectId(courseId)){

   scheme=await schemeService.fetchByCourse(courseId);

  }
  else{
    throw{status:400,message:"Invalid query parameters"};
   }
   return res.status(200).json({ data:scheme, success: true });
} catch (error) {
    handleError(res, error);
}
};
const getSchemeById = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const scheme = await schemeService.fetchById(id);
            return res.status(200).json({ data: scheme, success: true });
        }
    } catch (error) {
        handleError(res, error);
    }
};


//Create a new scheme

const createScheme = async (req, res) => {
    const schema = joi.object({
        courseId:joi.string().required(),
        totalMarks: joi.number().required(),
        parameters: joi.array()
            .items(
                joi.object({
                    name: joi.string().required(),
                    weightage: joi.number().required().min(0).max(100),
                }),
            )
            .required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);
         

         
       const scheme = await schemeService.create(data);

        return res.status(201).json({
            message: "Scheme created successfully",
            data: scheme,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

//update scheme

const updateScheme = async (req, res) => {
    const schema = joi.object({
        
        totalMarks: joi.number().required(),
        parameters: joi.array()
            .items(
                joi.object({
                    name: joi.string().required(),
                    weightage: joi.number().required().min(0).max(100),
                }),
            )
            .required(),
    });


    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const scheme = await schemeService.update(req.params.id,data);

        return res.status(200).json({
            message: "Scheme updated successfully",
            data: scheme,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete scheme
const deleteScheme = async (req, res) => {
    try {
        const scheme = await schemeService.deleteScheme(req.params.id);

        return res.status(200).json({
            message: "Scheme deleted successfully",
            data: scheme,
            success: true,
        });
    } catch (error) {
        handleError(res, error);
    }
};

export default {
    getSchemeByCourse,
    getSchemeById,
    createScheme,
    updateScheme,

    deleteScheme,
};