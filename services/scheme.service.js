import courseModel from "../models/Course.js";
import schemeModel from "../models/Scheme.js";


const getById = async (schemeId) => {
    const scheme = await schemeModel.findById(schemeId);

    if (!scheme) {
        throw { status: 404, message: "Scheme not found" };
    }

    return scheme;
};

const getByCourse = async (courseId) => {
    const course = await courseModel.findById(courseId);
    if (!course) {
        throw {
            status: 404,
            message: "Course not found",
        };
    }

    const scheme = await schemeModel.findOne({ courseId: courseId });

    return scheme;
};

const create = async (data) => {
    const course = await courseModel.findById(data.courseId);
    if (!course) {
        throw { status: 404, message: "course not found" };
    }
    const scheme = new schemeModel({
        totalMarks: data.totalMarks,
        parameters: data.parameters,
    });

    await scheme.save();
    return scheme;
};

const update = async (schemeId, data) => {
    const scheme = await schemeModel.findById(schemeId);
    if (!scheme) {
        throw { status: 404, message: "Scheme not found" };
    }
    await schemeModel.findByIdAndUpdate(schemeId, {
        totalMarks: data.totalMarks,
        parameters: data.parameters,
    });

    return scheme;
};

const remove= async (schemeId) => {
    const scheme = await schemeModel.findById(schemeId);
    if (!scheme) {
        throw { status: 404, message: "Scheme not found" };
    }
    await schemeModel.findByIdAndDelete(schemeId);

    return scheme;
};

export default {
    getById,
    getByCourse,
    create,
    update,
    remove,
};
