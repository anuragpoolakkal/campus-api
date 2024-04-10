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

const getById = async (collegeId) => {
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

const remove = async (collegeId) => {
    const college = await fetchById(collegeId);

    await collegeModel.findByIdAndDelete(collegeId);
    //Unassign college from admin
    await adminModel.findOneAndDelete({ collegeId: collegeId });

    return college;
};

const getAllCounts = async (collegeId) => {
    // Fetch college information
    const college = await fetchById(collegeId);
    if (!college) {
        throw { status: 404, message: "College not found" };
    }

    const [courseCount, departmentCount, programCount, studentCount, semesterCount, facultyCount] =
        await Promise.all([
            courseModel.countDocuments({ collegeId }),
            departmentModel.countDocuments({ collegeId }),
            programModel.countDocuments({ collegeId }),
            studentModel.countDocuments({ collegeId }),
            semesterModel.countDocuments({ collegeId }),
            facultyModel.countDocuments({ collegeId }),
        ]);

    const courseIds = (await courseModel.find({ collegeId }, "_id")).map((course) => course._id);
    const feedbackCounts = await Promise.all(
        courseIds.map((courseId) => feedbackModel.countDocuments({ courseId })),
    );
    const feedbackCount = feedbackCounts.reduce((total, count) => total + count, 0);

    const programIds = (await programModel.find({ collegeId }, "_id")).map(
        (program) => program._id,
    );
    const batchCounts = await Promise.all(
        programIds.map((programId) => batchModel.countDocuments({ programId })),
    );
    const batchCount = batchCounts.reduce((total, count) => total + count, 0);

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
    getById,
    getAllCounts,
    create,
    update,
    remove,
    checkCollegeBelongsToUser,
};
