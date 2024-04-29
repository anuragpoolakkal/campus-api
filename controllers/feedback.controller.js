import joi from "joi";
import feedbackService from "../services/feedback.service.js";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";

const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const feedback = await feedbackService.getById(id);
            logger.info(`Feedback with id ${id} fetched successfully`);
            return res.status(200).json({ data: feedback, success: true });
        }
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const getFeedback = async (req, res) => {
    try {
        const feedback = req.user.role === "student" ? await feedbackService.getAllForStudent(req.user._id) : await feedbackService.getAllByCollege(req.user.college._id);
        logger.error(`Feedback fetched successfully`);
        return res.status(200).json({ data: feedback, success: true });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const getPendingFeedbacks = async (req, res) => {
    try {
        const feedback = await feedbackService.getPendingFeedbacks(req.user._id);
        logger.error(`Feedback fetched successfully`);
        return res.status(200).json({ data: feedback, success: true });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const createFeedback = async (req, res) => {
    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string(),
        color: joi.string().valid("black", "red", "green", "blue", "yellow", "pink"),
        questions: joi
            .array()
            .items(
                joi.object({
                    question: joi.string().required(),
                    description: joi.string(),
                    settings: joi.object({
                        type: joi.string().valid("text", "longtext", "multiplechoice", "rating").required(),
                        options: joi.array(),
                        min: joi.number(),
                        max: joi.number(),
                        required: joi.boolean().required()
                    })
                }),
            ),
        courseId: joi.string().required(),
    });
    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const feedback = await feedbackService.create(data, req.user._id);

        logger.info("feedback created successfully");
        return res.status(201).json({
            message: "feedback created successfully",
            data: feedback,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }

}

const updateFeedback = async (req, res) => {
    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        color: joi.string().valid("black", "red", "green", "blue", "yellow", "pink").required(),
        questions: joi
            .array()
            .items(
                joi.object({
                    question: joi.string(),
                    settings: joi.object({
                        type: joi.string().valid("text", "longtext", "multiplechoice", "rating").required(),
                        options: joi.array(),
                        min: joi.number(),
                        max: joi.number(),
                        required: joi.boolean(),
                    })
                }),
            )
            .required(),
        courseId: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const feedback = await feedbackService.update(req.params.id, data);

        logger.info("Feedback updated successfully");
        return res.status(200).json({
            message: "Feedback updated successfully",
            data: feedback,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const deleteFeedback = async (req, res) => {
    try {
        const feedback = await feedbackService.remove(req.params.id);

        logger.info("Feedback deleted successfully");
        return res.status(200).json({
            message: "Feedback deleted successfully",
            data: feedback,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const generateQuestionsUsingAI = async (req, res) => {
    const schema = joi.object({
        feedbackId: joi.string().required(),
        prompt: joi.string().required(),
        maxQuestions: joi.number().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const questions = await feedbackService.generateQuestionsUsingAI(data);

        logger.info("Questions generated successfully");
        return res.status(200).json({
            message: "Questions generated successfully",
            data: questions,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

const submitFeedback = async (req, res) => {
    const schema = joi.object({
        feedbackId: joi.string().required(),
        responses: joi.object().required()
    });

    try {
        const data = await schema.validateAsync(req.body);
        const feedbackResponse = await feedbackService.submitFeedback(data, req.user._id);

        logger.info("Feedback submitted successfully");
        return res.status(200).json({
            message: "Feedback submitted successfully",
            data: feedbackResponse,
            success: true,
        });
    } catch (error) {
        logger.error(error);
        handleError(res, error);
    }
};

export default {
    getFeedback,
    getFeedbackById,
    getPendingFeedbacks,
    //getFeedbackAllCollege,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    generateQuestionsUsingAI,
    submitFeedback
};