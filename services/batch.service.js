import batchModel from "../models/Batch.js";
import programModel from "../models/Program.js";

const getById = async (batchId) => {
    try {
        const batch = await batchModel.findById(batchId).lean();
        if (!batch) {
            throw { status: 404, message: "Batch not found" };
        }

        batch.program = await programModel.findById(batch.programId).select("name").lean();

        return batch;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAll = async (collegeId) => {
    try {
        const batches = await batchModel.find({ collegeId: collegeId }).lean();

        for (const batch of batches) {
            batch.program = await programModel.findById(batch.programId).select("name").lean();
        }

        return batches;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllByProgramId = async (programId) => {
    try {
        return await batchModel.find({ programId });
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllByDepartmentId = async (deptId) => {
    try {
        return await batchModel.find({ deptId });
    } catch (error) {
        throw new Error(error.message);
    }
};

const create = async (data, userId, collegeId) => {
    try {
        const batch = new batchModel({
            name: data.name,
            startYear: data.startYear,
            endYear: data.endYear,
            programId: data.programId,
            collegeId: collegeId,
            createdBy: userId,
        });

        return await batch.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (batchId, data, collegeId) => {
    try {
        const batch = await batchModel.findByIdAndUpdate({ _id: batchId, collegeId: collegeId }, data);
        if (!batch) {
            throw { status: 404, message: "Batch not found with id" };
        }

        return getById(batchId);
    } catch (error) {
        throw new Error(error.message);
    }
};

const remove = async (batchId) => {
    try {
        return await batchModel.findByIdAndDelete(batchId);
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    getById,
    getAll,
    getAllByProgramId,
    getAllByDepartmentId,
    create,
    update,
    remove,
};
