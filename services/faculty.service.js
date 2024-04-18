import facultyModel from "../models/Faculty.js";
import userModel from "../models/User.js";

// const checkCollegeBelongsToUser = async (facultyId, userFacultyId) => {
//     if (facultyId != userFacultyId) {
//         throw { status: 401, message: "Unauthorized" };
//     }
// };

const getAll = async (collegeId) => {
    const faculties = await facultyModel.find({ collegeId: collegeId }).lean();

    for (const faculty of faculties) {
        const user = await userModel.findById(faculty.userId).lean();
        faculty.name = user.name;
        faculty.email = user.email;
        faculty.gender = user.gender;
    }

    return faculties;
};

const getById = async (facultyId) => {
    const faculty = await facultyModel.findById(facultyId).lean();
    if (!faculty) {
        throw { status: 404, message: "Faculty not found" };
    }

    const user = await userModel.findById(faculty.userId).lean();
    faculty.name = user.name;
    faculty.email = user.email;
    faculty.gender = user.gender;

    return faculty;
};

const create = async (data, userId, adminCollegeId) => {
    try {
        const faculty = new facultyModel({
            userId: userId,
            title: data.title,
            role: data.role,
            collegeId: adminCollegeId,

        });

        return await faculty.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (id, data, adminCollegeId) => {
    const faculty = await facultyModel.findOneAndUpdate({ _id: id, collegeId: adminCollegeId }, {
        title: data.title,
        role: data.role,
    });
    if (!faculty) {
        throw { status: 404, message: "Faculty not found with id" };
    }

    const user = await userModel.findByIdAndUpdate(faculty.userId, {
        name: data.name,
        gender: data.gender,
    });
    if (!user) {
        throw { status: 404, message: "User not found with Faculty.userId" };
    }

    return getById(id);
};

const remove = async (id) => {
    const faculty = await facultyModel.findByIdAndDelete(id);
    if (!faculty) {
        throw { status: 404, message: "Faculty not found" };
    }

    await userModel.findByIdAndDelete(faculty.userId);

    return faculty;
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    //  checkCollegeBelongsToUser,
};
