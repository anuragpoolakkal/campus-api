import batchModel from "../models/Batch.js";

const createBatch = async (data, userId) => {
    try {
        const batch = new batchModel({
            name: data.name,
            programId: data.programId,
            deptId: data.deptId,
            startYear: data.startYear,
            endYear: data.endYear,
            createdBy: userId,
        });

        return await batch.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const fetchById = async (batchId) => {
    try {
        return await batchModel.findById(batchId);
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateBatch = async (batchId, data) => {
    try {
        return await batchModel.findByIdAndUpdate(batchId, { $set: data }, { runValidators: true });
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteBatch = async (batchId) => {
    try {
        return await batchModel.findByIdAndDelete(batchId);
    } catch (error) {
        throw new Error(error.message);
    }
};

const fetchAll = async () => {
    try {
        return await batchModel.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

const fetchAllByProgramId = async (programId) => {
    try {
        return await batchModel.find({ programId });
    } catch (error) {
        throw new Error(error.message);
    }
};

const fetchAllByDepartmentId = async (deptId) => {
    try {
        return await batchModel.find({ deptId });
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    createBatch,
    fetchById,
    updateBatch,
    deleteBatch,
    fetchAll,
    fetchAllByProgramId,
    fetchAllByDepartmentId,
};
