//services
import courseModel from "../models/Course.js";
import feedbackModel from "../models/Feedback.js";
import userModel from "../models/User.js";

const getById = async (feedbackId) => {
    const feedback = await feedbackModel.findById(feedbackId);
    if (!feedback) {
        throw { status: 404, message: "feedback not found" };
    }

    return feedback;
};

const getAllByCourseId = async (courseId) => {
    const course = await courseModel.findById(courseId);
    if (!course) {
        throw { status: 404, message: "course not found" };
    }

    const feedback = await feedbackModel.find({ courseId: courseId });

    return feedback;
};

const getAllByCollege = async () => {
    const feedbacks = await feedbackModel.find().lean();

    for (const feedback of feedbacks) {
        const course = await courseModel.findById(feedback.courseId).lean();
        const user = await userModel.findById(feedback.createdBy).lean();
        feedback.course = course;
        feedback.createdBy = user;
    }

    return feedbacks;
};

const create = async (data, userId) => {
    const course = await courseModel.findById(data.courseId);
    if (!course) {
        throw { status: 404, message: "course not found" };
    }
    const feedback = new feedbackModel({
        title: data.title,
        description: data.description,
        questions: data.questions,
        courseId: data.courseId,
        createdBy: userId
    });

    await feedback.save();
    return feedback;
};

const update = async (feedbackId, data) => {
    const feedback = await feedbackModel.findById(feedbackId);
    if (!feedback) {
        throw { status: 404, message: "Feedback not found" };
    }
    await feedbackModel.findByIdAndUpdate(feedbackId, {
        title: data.title,
        description: data.description,
        questions: data.questions,
        courseId: data.courseId
    });

    return feedback;
};

const remove = async (feedbackId) => {
    const feedback = await feedbackModel.findById(feedbackId);
    if (!feedback) {
        throw { status: 404, message: "feedback not found" };
    }
    await feedbackModel.findByIdAndDelete(feedbackId);

    return feedback;
};

export default {
    getById,
    getAllByCollege,
    getAllByCourseId,
    create,
    update,
    remove
};