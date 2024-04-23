import facultyModel from "../models/Faculty.js";
import userModel from "../models/User.js";
import hodModel from "../models/Hod.js";
import courseModel from "../models/Course.js";

// const checkCollegeBelongsToUser = async (facultyId, userFacultyId) => {
//     if (facultyId != userFacultyId) {
//         throw { status: 401, message: "Unauthorized" };
//     }
// };

const getAll = async (collegeId) => {
    const faculties = await facultyModel.find({ collegeId: collegeId }).lean();

    for (const faculty of faculties) {
        const user = await userModel.findById(faculty?.userId).lean();
        faculty.name = user?.name;
        faculty.email = user?.email;
        faculty.gender = user?.gender;
    }

    return faculties;
};

const getById = async (facultyId) => {
    const faculty = await facultyModel.findById(facultyId).lean();
    if (!faculty) {
        throw { status: 404, message: "Faculty not found" };
    }

    const user = await userModel.findById(faculty?.userId).lean();
    faculty.name = user?.name;
    faculty.email = user?.email;
    faculty.gender = user?.gender;

    return faculty;
};

const create = async (data, userId, collegeId) => {
    try {
        const faculty = new facultyModel({
            userId: userId,
            title: data.title,
            role: data.role,
            collegeId: collegeId,
        });

        return await faculty.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (id, data, collegeId) => {
    const faculty = await facultyModel.findOneAndUpdate({ _id: id, collegeId: collegeId }, {
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
    const hod = await hodModel.find({
        facultyId: id,
    });

    if (hod.length > 0) {
        throw { status: 400, message: "Faculty is assigned as HOD" };
    }

    const courses = await courseModel.find({
        faculties: id,
    });

    if (courses.length > 0) {
        throw { status: 400, message: "Faculty is assigned to courses" };
    }

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
