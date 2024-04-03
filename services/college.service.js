import adminModel from "../models/Admin.js";
import collegeModel from "../models/College.js";

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

export default {
    fetchById,
    create,
    update,
    deleteCollege,
    checkCollegeBelongsToUser,
};
