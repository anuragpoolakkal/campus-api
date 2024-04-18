import semesterModel from "../models/Semester.js";
import programModel from "../models/Program.js";

const getAll = async (collegeId) => {
    const semesters = await semesterModel.find({ collegeId: collegeId }).lean();

    for (const semester of semesters) {
        const program = await programModel.findById(semester?.programId).select("name");
        semester.program = program;
    }

    return semesters;
};

const getById = async (semesterId) => {
    const semester = await semesterModel.findById(semesterId);

    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    return semester;
};

const getAllByProgramId = async (programId) => {
    const semesters = await semesterModel.find({ programId });

    if (!semesters) {
        throw { status: 404, message: "No semesters found for the provided programId" };
    }

    return semesters;
};

const create = async (data, collegeId) => {
    try {
        const semester = new semesterModel({
            name: data.name,
            number: data.number,
            collegeId: collegeId,
            programId: data.programId,
        });

        return await semester.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (semesterId, data) => {
    const program = await programModel.findById(data.programId);
    if (!program) {
        throw { status: 404, message: "Program not found" };
    }

    const semester = await semesterModel.findByIdAndUpdate(semesterId, data, { new: true });
    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    return getById(semesterId);
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
    getAll,
    getAllByProgramId,
    create,
    update,
    remove,
};
