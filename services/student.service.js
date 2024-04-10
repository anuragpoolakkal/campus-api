import studentModel from "../models/Student.js";
import userModel from "../models/User.js";

const create = async (data, userId, adminCollegeId) => {
    try {
        const student = new studentModel({
            userId: userId,
            admNo: data.admNo,
            phone: data.phone,
            address: data.address,
            rollNo: data.rollNo,
            batchId: data.batchId,
            collegeId: adminCollegeId,
        });

        return await student.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (id, data) => {
    const student = await studentModel.findByIdAndUpdate(id, data, { new: true });
    if (!student) {
        throw { status: 404, message: "Student not found" };
    }
    return student;
};

const getById = async (id) => {
    const student = await studentModel.findById(id);
    if (!student) {
        throw { status: 404, message: "Student not found" };
    }
    return student;
};

const getAll = async (adminCollegeId) => {
    const students = await studentModel.find({ collegeId: adminCollegeId }).lean();
    for (const student of students) {
        const user = await userModel.findById(student.userId).lean();
        student.name = user.name;
        student.email = user.email;
    }

    return students;
};

const remove = async (id) => {
    const student = await studentModel.findByIdAndDelete(id);
    if (!student) {
        throw { status: 404, message: "Student not found" };
    }

    await userModel.findByIdAndDelete(student.userId);

    return student;
};

export default {
    getById,
    getAll,
    create,
    update,
    remove,
};
