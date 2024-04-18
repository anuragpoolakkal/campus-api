import hodModel from "../models/Hod.js";
import facultyModel from "../models/Faculty.js";
import departmentModel from "../models/Department.js";
import userModel from "../models/User.js";

// const checkCollegeBelongsToUser = async (hodId, userhodId) => {
//     if (hodId != userhodId) {
//         throw { status: 401, message: "Unauthorized" };
//     }
// };

const getAll = async (collegeId) => {
    const hods = await hodModel.find({ collegeId: collegeId }).lean();

    for (const hod of hods) {
        const faculty = await facultyModel.findById(hod.facultyId).lean();
        const user = await userModel.findById(faculty.userId).lean();
        hod.name = user.name;
        hod.email = user.email;
        hod.gender = user.gender;
        hod.role = faculty.role;
        hod.department = await departmentModel.findById(hod.departmentId).select("name").lean();
    }

    return hods;
};

const getById = async (hodId) => {
    const hod = await hodModel.findById(hodId).lean();
    if (!hod) {
        throw { status: 404, message: "hod not found" };
    }

    const faculty = await facultyModel.findById(hod.facultyId).lean();
    const user = await userModel.findById(faculty.userId).lean();
    hod.name = user.name;
    hod.email = user.email;
    hod.gender = user.gender;
    hod.role = faculty.role;
    hod.department = await departmentModel.findById(hod.departmentId).select("name").lean();

    return hod;
};

const create = async (data, adminCollegeId) => {
    try {
        const hodExists = await hodModel.findOne({ $or: [{ facultyId: data.facultyId }, { departmentId: data.departmentId }] });
        if (hodExists) {
            throw { status: 400, message: "Hod already exists" };
        }

        const hod = new hodModel({
            facultyId: data.facultyId,
            departmentId: data.departmentId,
            collegeId: adminCollegeId,
        });

        const faculty = await facultyModel.findByIdAndUpdate(data.facultyId, { role: "hod" }); //change role to hod
        if (!faculty) {
            throw { status: 404, message: "Faculty not found" };
        }

        return await hod.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (id, data) => {
    const hod = await hodModel.findByIdAndUpdate(id, {
        facultyId: data.facultyId,
        departmentId: data.departmentId,
    });
    if (!hod) {
        throw { status: 404, message: "hod not found with hodId" };
    }

    return getById(id);
};

const remove = async (id) => {
    const hod = await hodModel.findByIdAndDelete(id);
    if (!hod) {
        throw { status: 404, message: "hod not found" };
    }

    await facultyModel.findByIdAndUpdate(hod.facultyId, { role: "teacher" }); //change role back to teacher

    return hod;
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    //  checkCollegeBelongsToUser,
};
