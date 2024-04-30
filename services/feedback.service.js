import courseModel from "../models/Course.js";
import feedbackModel from "../models/Feedback.js";
import feedbackResponseModel from "../models/FeedbackResponse.js";
import userModel from "../models/User.js";
import batchModel from "../models/Batch.js";
import studentModel from "../models/Student.js";
import { feedbackQuestionsGenerationPrompt, openai } from "../utils/utils.js";

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

const getFeedbackResponses = async (feedbackId) => {
    const feedbackResponses = await feedbackResponseModel.find({ feedbackId: feedbackId }).lean();

    if (!feedbackResponses) {
        throw { status: 404, message: "Feedback not found" };
    }

    let questions = {};

    const feedback = await feedbackModel.findById(feedbackId);

    for (const response of feedbackResponses) {
        for (const questionId of Object.keys(response.responses)) {
            const question = feedback.questions.find((q) => q._id == questionId);
            if (!question) {
                continue;
            }

            const student = await studentModel.findById(response.studentId).lean();
            if (!student) {
                throw { status: 404, message: "Student not found" };
            }

            const studentData = await userModel.findById(student.userId).lean();

            if (!questions[studentData.name]) {
                questions[studentData.name] = {};
            }

            questions[studentData.name][question.question] = response.responses[questionId];
        }
    }

    return questions;
};

const getAllByCollege = async (collegeId) => {
    const courses = await courseModel.find({ collegeId: collegeId });
    var feedbacks = [];
    for (const course of courses) {
        const feedbacksData = await feedbackModel.find({ courseId: course._id }).lean();
        for (const feedback of feedbacksData) {
            if (!feedback) {
                continue;
            }
            const courseData = await courseModel.findById(feedback.courseId).lean();
            const user = await userModel.findById(feedback.createdBy).lean();
            const responsesCount = await feedbackResponseModel.find({ feedbackId: feedback._id });
            feedback.course = courseData;
            feedback.createdBy = user;
            feedback.responsesCount = responsesCount.length;
            feedbacks.push(feedback);
        }
    }

    return feedbacks;
};

const getAllForStudent = async (userId) => {
    const student = await studentModel.findOne({ userId: userId });
    const batch = await batchModel.findById(student.batchId);
    const courses = await courseModel.find({ programId: batch.programId });

    var feedbacks = [];

    for (const course of courses) {
        const feedbacksData = await feedbackModel
            .find({ courseId: course._id })
            .select("-questions")
            .lean();
        if (!feedbacks) {
            continue;
        }
        for (const feedback of feedbacksData) {
            const courseData = await courseModel.findById(feedback.courseId).lean();
            const user = await userModel.findById(feedback.createdBy).lean();
            const responsesCount = await feedbackResponseModel.find({ feedbackId: feedback._id });
            feedback.course = courseData;
            feedback.createdBy = user;
            feedback.responsesCount = responsesCount.length;
            feedbacks.push(feedback);
        }
    }

    return feedbacks;
};

const getPendingFeedbacks = async (userId) => {
    const student = await studentModel.findOne({ userId: userId });
    const batch = await batchModel.findById(student.batchId);
    const courses = await courseModel.find({ programId: batch.programId });

    var feedbacks = [];

    for (const course of courses) {
        const feedbacksData = await feedbackModel
            .find({ courseId: course._id })
            .select("-questions")
            .lean();
        if (!feedbacks) {
            continue;
        }
        for (const feedback of feedbacksData) {
            const feedbackResponse = await feedbackResponseModel.findOne({
                feedbackId: feedback._id,
                studentId: userId,
            });
            if (feedbackResponse) {
                continue;
            }
            const courseData = await courseModel.findById(feedback.courseId).lean();
            const user = await userModel.findById(feedback.createdBy).lean();
            const responsesCount = await feedbackResponseModel.find({ feedbackId: feedback._id });
            feedback.course = courseData;
            feedback.createdBy = user;
            feedback.responsesCount = responsesCount.length;
            feedbacks.push(feedback);
        }
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
        color: data.color,
        questions: data.questions,
        courseId: data.courseId,
        createdBy: userId,
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
        color: data.color,
        questions: data.questions,
        courseId: data.courseId,
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

const generateQuestionsUsingAI = async (data) => {
    const feedback = await feedbackModel.findById(data.feedbackId);
    if (!feedback) {
        throw { status: 404, message: "Feedback not found" };
    }

    const course = await courseModel.findById(feedback.courseId);
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: feedbackQuestionsGenerationPrompt },
            {
                role: "user",
                content: `Faculty provided these information: {\"courseName\": \"${course.name}\", \"prompt\": \"${data.prompt}\", \"maxQuestions\": \"${data.maxQuestions}\"}`,
            },
        ],
    });

    return JSON.parse(completion.choices[0].message.content);
};

const submitFeedback = async (data, studentId) => {
    const feedback = await feedbackModel.findById(data.feedbackId);
    if (!feedback) {
        throw { status: 404, message: "Feedback not found" };
    }

    const course = await courseModel.findById(feedback.courseId);
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    const feedbackResponseExists = await feedbackResponseModel.findOne({
        feedbackId: data.feedbackId,
        studentId: studentId,
    });
    if (feedbackResponseExists) {
        throw { status: 400, message: "Feedback already submitted" };
    }

    const feedbackResponse = new feedbackResponseModel({
        feedbackId: data.feedbackId,
        studentId: studentId,
        responses: data.responses,
    });

    await feedbackResponse.save();

    return feedbackResponse;
};

export default {
    getById,
    getAllByCollege,
    getAllByCourseId,
    create,
    update,
    remove,
    generateQuestionsUsingAI,
    submitFeedback,
    getAllForStudent,
    getPendingFeedbacks,
    getFeedbackResponses,
};
