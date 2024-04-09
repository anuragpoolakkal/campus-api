import studentModel from "../models/Student.js";

const createStudent = async (data, userId) => {
    try {
        const student = new studentModel({
            userId: userId,
            admNo: data.admNo,
            phone: data.phone,
            address: data.address,
            rollNo: data.rollNo,
            batchId: data.batchId,
            collegeId: data.collegeId,
        });

        return await student.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateStudent = async (id, data) => {
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

const deleteStudent = async (id) => {
    const student = await studentModel.findByIdAndDelete(id);
    if (!student) {
        throw { status: 404, message: "Student not found" };
    }
    return student;
};

export default {
    createStudent,
    updateStudent,
    findById,
    findAll,
    deleteStudent,
};
