//services
import CourseModel from "../models/Course.js";
import FeedbackModel from "../models/Feedback.js";
import collegeModel from "../models/College.js";

const fetchById = async (feedbackId) => {
    const feedback = await FeedbackModel.findById(feedbackId);
    if (!feedback) {
        throw { status: 404, message: "feedback not found" };
    }

    return feedback;
};

const fetchAllByCourseId = async (courseId) => {
    const course = await CourseModel.findById(courseId);
    if (!course) {
        throw { status: 404, message: "course not found" };
    }

    const feedback = await FeedbackModel.find({ courseId: courseId });

    return feedback;
};

const getAllFaculty = async () => {
    const feedback = await FeedbackModel.find();
    return feedback;
};

const create = async (data, userId) => {
    const course = await CourseModel.findById(data.courseId);
    if (!course) {
        throw { status: 404, message: "course not found" };
    }
    const feedback = new FeedbackModel({
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
    const feedback = await FeedbackModel.findById(feedbackId);
    if (!feedback) {
        throw { status: 404, message: "Feedback not found" };
    }
    await FeedbackModel.findByIdAndUpdate(feedbackId, {
        title: data.title,
        description: data.description,
        questions: data.questions,
        courseId: data.courseId
    });

    return feedback;
};

const deleteFeedback = async (feedbackId) => {
    const feedback = await FeedbackModel.findById(feedbackId);
    if (!feedback) {
        throw { status: 404, message: "feedback not found" };
    }
    await FeedbackModel.findByIdAndDelete(feedbackId);

    return feedback;
};

export default {
    fetchById,
    getAllFaculty,
    fetchAllByCourseId,
    create,
    update,
    deleteFeedback
};