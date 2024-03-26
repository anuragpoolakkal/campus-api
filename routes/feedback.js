import express from "express";
import feedbackModel from "../models/Feedback.js";
import joi from "joi";

const router = express.Router();

// Create new feedback
router.post("/", async (req, res) => {
    const feedbackSchema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        questions: joi
            .array()
            .items(
                joi.object({
                    question: joi.string().required(),
                    settings: joi
                        .object({
                            type: joi
                                .string()
                                .valid("text", "longtext", "multiplechoice", "rating")
                                .required(),
                            options: joi.array().items(joi.string()),
                            min: joi
                                .number()
                                .when("type", { is: "rating", then: joi.number().required() }),
                            max: joi
                                .number()
                                .when("type", { is: "rating", then: joi.number().required() }),
                        })
                        .required(),
                }),
            )
            .required(),
        courseId: joi.string().required(),
        createdBy: joi.string().required(),
    });

    try {
        const { value: data, error } = feedbackSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Create a new feedback
        const feedback = new feedbackModel({
            title: data.title,
            description: data.description,
            questions: data.questions,
            courseId: data.courseId,
            createdBy: data.createdBy,
        });

        await feedback.save();

        res.status(201).json({
            message: "Feedback created successfully",
            data: feedback,
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// GET feedback by id
router.get("/:id", async (req, res) => {
    try {
        const feedback = await feedbackModel.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found", success: false });
        }
        res.json({ data: feedback, success: true, message: "Feedback found" });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// GET feedback by faculty ID
router.get("/faculty/:id", async (req, res) => {
    try {
        const feedback = await feedbackModel.find({ createdBy: req.params.id });

        if (!feedback || feedback.length === 0) {
            return res
                .status(404)
                .json({ message: "Feedback not found for this faculty", success: false });
        }

        res.json({ data: feedback, message: "Feedback found", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

// PUT: Update feedback by ID
router.put("/:id", async (req, res) => {
    const feedbackSchema = joi.object({
        title: joi.string(),
        description: joi.string(),
        questions: joi.array().items(
            joi.object({
                question: joi.string(),
                settings: joi.object({
                    type: joi.string().valid("text", "longtext", "multiplechoice", "rating"),
                    options: joi.array().items(joi.string()),
                    min: joi.number().when("type", { is: "rating", then: joi.number() }),
                    max: joi.number().when("type", { is: "rating", then: joi.number() }),
                }),
            }),
        ),
        courseId: joi.string(),
        createdBy: joi.string(),
    });

    try {
        const { id } = req.params;

        const { value: data, error } = feedbackSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false });
        }

        const feedback = await feedbackModel.findByIdAndUpdate(
            id,
            {
                title: data.title,
                description: data.description,
                questions: data.questions,
                courseId: data.courseId,
                createdBy: data.createdBy,
            },
            { new: true },
        );

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.json({ data: feedback, message: "Feedback updated successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

export default router;
