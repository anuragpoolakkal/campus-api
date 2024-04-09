import adminModel from "../models/Admin.js";
import collegeModel from "../models/College.js";
import courseModel from "../models/Course.js";
import programModel from "../models/Program.js";
import departmentModel from "../models/Department.js";
import batchModel from "../models/Batch.js";
import studentModel from "../models/Student.js";
import semesterModel from "../models/Semester.js";
import facultyModel from "../models/Faculty.js";
import feedbackModel from "../models/Feedback.js";

const checkCollegeBelongsToUser = async (collegeId, userCollegeId) => {
    if (collegeId != userCollegeId) {
        throw { status: 401, message: "Unauthorized" };
    }
};

const fetchById = async (collegeId) => {
    const college = await collegeModel.findById(collegeId);
    if (!college) {
        throw { status: 404, message: "College not found" };
    }

    return college;
};

const create = async (data, userId) => {
    const college = new collegeModel({
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
        vision: data.vision,
        mission: data.mission,
        createdBy: userId,
    });

    await college.save();

    //Assign college to admin
    const newAdmin = new adminModel({
        userId: userId,
        collegeId: college._id,
    });

    await newAdmin.save();

    return college;
};

const update = async (collegeId, data) => {
    const college = await collegeModel.findByIdAndUpdate(
        collegeId,
        { $set: data },
        { runValidators: true },
    );

    if (!college) {
        throw { status: 404, message: "College not found" };
    }

    return college;
};

const deleteCollege = async (collegeId) => {
    const college = await fetchById(collegeId);

    await collegeModel.findByIdAndDelete(collegeId);
    //Unassign college from admin
    await adminModel.findOneAndDelete({ collegeId: collegeId });

    return college;
};

const getAllCounts = async (collegeId) => {
    const college = await fetchById(collegeId);

    if (!college) {
        throw { status: 404, message: "College not found" };
    }

    const courseCount = await courseModel.countDocuments({ collegeId: collegeId });
    let allCourses = await courseModel.find({ collegeId });
    let feedbackCount = 0;
    for (let i = 0; i < allCourses.length; i++) {
        feedbackCount += await feedbackModel.find({ courseId: allCourses[i]._id }).countDocuments();
    }

    const departmentCount = await departmentModel.countDocuments({ collegeId: collegeId });
    const programCount = await programModel.countDocuments({ collegeId: collegeId });
    const allprograms = await programModel.find({ collegeId });
    let batchCount = 0;
    for (let i = 0; i < allprograms.length; i++) {
        batchCount += await batchModel.find({ programId: allprograms[i]._id }).countDocuments();
    }

    const studentCount = await studentModel.countDocuments({ collegeId: collegeId });
    const semesterCount = await semesterModel.countDocuments({ collegeId: collegeId });
    const facultyCount = await facultyModel.countDocuments({ collegeId: collegeId });

    return {
        courseCount,
        departmentCount,
        programCount,
        batchCount,
        studentCount,
        semesterCount,
        feedbackCount,
        facultyCount,
    };
};

export default {
    fetchById,
    create,
    update,
    deleteCollege,
    checkCollegeBelongsToUser,
    getAllCounts,
};
