import programModel from "../models/Program.js";
import facultyModel from "../models/Faculty.js";
import userModel from "../models/User.js";
import hodModel from "../models/Hod.js";

const getAll = async (collegeId) => {
    try {
        const programs = await programModel.find({ collegeId: collegeId }).lean();
        for (const program of programs) {
            const hod = await hodModel.findById(program?.hodId).lean();
            const faculty = await facultyModel.findById(hod?.facultyId).lean();
            const user = await userModel.findById(faculty?.userId).lean();
            program.hod = {
                name: user?.name,
                email: user?.email,
            };
        }

        return programs;
    } catch (error) {
        console.log(error)
        throw new Error("Error fetching programs from database");
    }
};

const getById = async (id) => {
    try {
        const program = await programModel.findById(id).lean();
        const hod = await hodModel.findById(program?.hodId).lean();
        const faculty = await facultyModel.findById(hod?.facultyId).lean();
        const user = await userModel.findById(faculty?.userId).lean();
        program.hod = {
            name: user?.name,
            email: user?.email,
        };

        return program;
    } catch (error) {
        throw new Error("Error fetching program by ID from database");
    }
};

const create = async (data, collegeId) => {
    try {
        const hod = await hodModel.findById(data.hodId);
        if (!hod) {
            throw new Error("HOD not found");
        }

        const program = new programModel({
            name: data.name,
            hodId: data.hodId,
            collegeId: collegeId,
        });

        return await program.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (id, data, collegeId) => {
    const program = await programModel.findOneAndUpdate({ _id: id, collegeId: collegeId }, {
        name: data.name,
        hodId: data.hodId,
    });
    if (!program) {
        throw { status: 404, message: "Program not found with id" };
    }

    return getById(id);
};

const remove = async (id) => {
    const program = await programModel.findByIdAndDelete(id);
    if (!program) {
        throw { status: 404, message: "Program not found" };
    }

    return program;
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
};
