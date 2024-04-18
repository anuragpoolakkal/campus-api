import batchModel from "../models/Batch.js";

const create = async (data, userId) => {
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

const getById = async (batchId) => {
    try {
        return await batchModel.findById(batchId);
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (batchId, data) => {
    try {
        return await batchModel.findByIdAndUpdate(batchId, { $set: data }, { runValidators: true });
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

const getAll = async (collegeId) => {
    try {
        return await batchModel.find({ collegeId: collegeId });
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

export default {
    getById,
    getAll,
    getAllByProgramId,
    getAllByDepartmentId,
    create,
    update,
    remove,
};
