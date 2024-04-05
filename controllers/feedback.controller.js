import joi from "joi";
import FeedbackService from "../services/feedback.service.js";
import { isValidObjectId } from "mongoose";
import { handleError } from "../utils/utils.js";
import logger from "../utils/logger.js";

const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const feedback = await FeedbackService.fetchById(id);
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
        const feedback = await FeedbackService.getAllFaculty(req.user.college._id);
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
        description: joi.string().required(),
        questions: joi
            .array()
            .items(
                joi.object({
                    question: joi.string().required(),
                    settings: joi.object({
                        type: joi.string().required(),
                        options: joi.array(),
                        min: joi.number(),
                        max: joi.number(),
                    })
                }),
            )
            .required(),
        courseId: joi.string().required(),
    });
    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const feedback = await FeedbackService.create(data, req.user._id);

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
        questions: joi
            .array()
            .items(
                joi.object({
                    question: joi.string().required(),
                    settings: joi.object({
                        type: joi.string().valid("text", "longtext", "multiplechoice", "rating").required(),
                        options: joi.array(),
                        min: joi.number(),
                        max: joi.number(),
                    })
                }),
            )
            .required(),
        courseId: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const feedback = await FeedbackService.update(req.params.id, data);

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
        const feedback = await FeedbackService.deleteFeedback(req.params.id);

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

export default {
    getFeedback,
    getFeedbackById,
    //getFeedbackAllCollege,
    createFeedback,
    updateFeedback,
    deleteFeedback,
};