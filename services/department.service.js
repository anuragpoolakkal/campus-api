import collegeModel from "../models/College.js";
import DepartmentModel from "../models/Department.js";

//Check if the department and user belongs to the same college
const checkDepartmentUserCollege = async (departmentId, userCollegeId) => {
    if (departmentId != userCollegeId) {
        throw { status: 401, message: "Unauthorized" };
    }
};

const getById = async (departmentId) => {
    const department = await DepartmentModel.findById(departmentId);
    if (!department) {
        throw { status: 404, message: "Department not found" };
    }

    return department;
};

const getAllByCollege = async (collegeId) => {
    const college = await collegeModel.findById(collegeId);
    if (!college) {
        throw { status: 404, message: "College not found" };
    }

    const department = await DepartmentModel.find({ collegeId: collegeId });

    return department;
};

const create = async (data, userId, collegeId) => {
    const department = new DepartmentModel({
        name: data.name,
        collegeId: collegeId,
        vision: data.vision,
        mission: data.mission,
        createdBy: userId
    });

    await department.save();

    return department;
};

const update = async (departmentId, data, collegeId) => {
    const department = await DepartmentModel.findById(departmentId);
    if (!department) {
        throw { status: 404, message: "department not found" };
    }

    //Check if the course and user belongs to the same college
    //checkDepartmentUserCollege(department.collegeId, collegeId);

    await DepartmentModel.findByIdAndUpdate(departmentId, {
        name: data.name,
        vision: data.vision,
        mission: data.mission,
    });

    return department;
};

const remove = async (departmentId) => {
    const department = await fetchById(departmentId);

    await DepartmentModel.findByIdAndDelete(departmentId);

    return department;
};

export default {
    getById,
    getAllByCollege,
    create,
    update,
    remove,
    checkDepartmentUserCollege,
};