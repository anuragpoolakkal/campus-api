import batchModel from "../models/Batch.js";
import collegeModel from "../models/College.js";
import userModel from "../models/User.js";
import studentModel from "../models/Student.js";

const create = async (data, userId, collegeId) => {
    try {
        const batch = await batchModel.findById(data.batchId);
        if (!batch) {
            throw { status: 404, message: "Batch not found" };
        }

        const college = await collegeModel.findById(collegeId);
        if (!college) {
            throw { status: 404, message: `College not found for ID: ${collegeId}` };
        }

        const user = await userModel.findById(userId);
        if (!user || user.role !== "student") {
            throw { status: 404, message: "Invalid user or not a student" };
        }

        const student = new studentModel({
            name: data.name,
            admNo: data.admNo,
            email: data.email,
            phone: data.phone,
            address: data.address,
            rollNo: data.rollNo,
            batchId: data.batchId,
            collegeId: collegeId,
            userId: userId,
        });

        await student.save();

        return student;
    } catch (error) {
        throw error;
    }
};

const update = async (id, data) => {
    const student = await studentModel.findByIdAndUpdate(id, data, { new: true });
    if (!student) {
        throw { status: 404, message: "Student not found" };
    }
    return student;
};

const findById = async (id) => {
    const student = await studentModel.findById(id);
    if (!student) {
        throw { status: 404, message: "Student not found" };
    }
    return student;
};

const findAll = async () => {
    return await studentModel.find();
};

const deleteById = async (id) => {
    const student = await studentModel.findByIdAndDelete(id);
    if (!student) {
        throw { status: 404, message: "Student not found" };
    }
    return student;
};

export default {
    create,
    update,
    findById,
    findAll,
    deleteById,
};
