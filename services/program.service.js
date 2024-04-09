import programModel from "../models/Program.js";
import collegeModel from "../models/College.js";
import departmentModel from "../models/Department.js";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";

const getAllPrograms = async () => {
    try {
        return await programModel.find();
    } catch (error) {
        throw new Error("Error fetching programs from database");
    }
};

const getProgramById = async (id) => {
    try {
        return await programModel.findById(id);
    } catch (error) {
        throw new Error("Error fetching program by ID from database");
    }
};

const createProgram = async (data) => {
    try {
        const { name, deptId, collegeId } = data;

        if (isValidObjectId(collegeId) === false || isValidObjectId(deptId) == false) {
            throw new Error("Invalid college or department ID");
        }

        const college = await collegeModel.findById(collegeId);

        if (!college) {
            throw new Error("College not found");
        }

        const department = await departmentModel.findById(deptId);
        if (!department) {
            throw new Error("Department not found in college");
        }

        const program = new programModel({
            name,
            deptId,
            collegeId,
        });

        return await program.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateProgram = async (id, data) => {
    try {
        const { name, deptId, collegeId } = data;

        if (
            !mongoose.Types.ObjectId.isValid(collegeId) ||
            !mongoose.Types.ObjectId.isValid(deptId)
        ) {
            throw new Error("Invalid college or department ID");
        }

        return await programModel.findByIdAndUpdate(id, { name, deptId, collegeId }, { new: true });
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteProgram = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid program ID");
        }

        return await programModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    getAllPrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram,
};
