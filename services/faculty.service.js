import facultyModel from "../models/Faculty.js";

const checkCollegeBelongsToUser = async (facultyId, userFacultyId) => {
    if (facultyId != userFacultyId) {
        throw { status: 401, message: "Unauthorized" };
    }
};

const fetchById = async (facultyId) => {
    const faculty = await facultyModel.findById(facultyId);
    if (!faculty) {
        throw { status: 404, message: "Faculty not found" };
    }

    return faculty;
};
const create = async (data, userId) => {
    const faculty = new facultyModel({
        name: data.name,
        email: data.email,
        title: data.title,
        role: data.role,
        userId: userId,
    });

    await faculty.save();

    return faculty;
};
const update = async (facultyId, data) => {
    const faculty = await facultyModel.findByIdAndUpdate(
        facultyId,
        { $set: data },
        { runValidators: true },
    );

    if (!faculty) {
        throw { status: 404, message: "Faculty not found" };
    }

    return faculty;
};
export default {
    fetchById,
    create,
    update,
    checkCollegeBelongsToUser,
};
