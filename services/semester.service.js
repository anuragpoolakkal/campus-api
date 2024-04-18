import semesterModel from "../models/Semester.js";

const getAll = async (adminCollegeId) => {
    const semester = await semesterModel.find({ collegeId: adminCollegeId   });

    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    return semester;
};

const getById = async (semesterId) => {
    const semester = await semesterModel.findById(semesterId);

    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    return semester;
};

const getByProgramId = async (programId) => {
    const semesters = await semesterModel.find({ programId });

    if (!semesters) {
        throw { status: 404, message: "No semesters found for the provided programId" };
    }

    return semesters;
};

const create = async (data, adminCollegeId) => {
    try {
        const semester = new semesterModel({
            name: data.name,
            number: data.number,
            collegeId: adminCollegeId,
            programId: data.programId,
        });

        return await semester.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (semesterId, data) => {
    const semester = await semesterModel.findByIdAndUpdate(semesterId, data, { new: true });

    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    return semester;
};

const remove = async (semesterId) => {
    const semester = await semesterModel.findById(semesterId);

    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    await semesterModel.findByIdAndDelete(semesterId);
    return semester;
};

export default {
    getById,
    getByProgramId,
    getAll,
    create,
    update,
    remove,
};
