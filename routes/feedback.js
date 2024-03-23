import express from "express";
import Feedback from "../models/Feedback.js";
import joi from "joi";

const router = express.Router();

const feedbackSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    questions: joi.array()
        .items(
            joi.object({
                question: joi.string().required(),
                settings: joi.object({
                    type: joi.string()
                        .valid("text", "longtext", "multiplechoice", "rating")
                        .required(),
                    options: joi.array().items(joi.string()),
                    min: joi.number().when("type", { is: "rating", then: joi.number().required() }),
                    max: joi.number().when("type", { is: "rating", then: joi.number().required() }),
                }).required(),
            }),
        )
        .required(),
    courseId: joi.string().required(),
    createdBy: joi.string().required(),
});

// Create new feedback
router.post("/feedback", async (req, res) => {
    try {
        const { error } = feedbackSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { title, description, questions, courseId, createdBy } = req.body;

        // Create a new feedback
        const feedback = new Feedback({
            title,
            description,
            questions,
            courseId,
            createdBy,
        });

        await feedback.save();

        res.status(201).json({ message: "Feedback created successfully", data: feedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET feedback by id
router.get("/feedback/:id", async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET feedback by faculty ID
router.get("/feedback/faculty/:id", async (req, res) => {
    try {
        const feedback = await Feedback.find({ createdBy: req.params.id });
        if (!feedback || feedback.length === 0) {
            return res.status(404).json({ message: "Feedback not found for this faculty" });
        }
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update feedback by ID
router.put("/feedback/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, questions, courseId, createdBy } = req.body;

        const feedback = await Feedback.findByIdAndUpdate(
            id,
            {
                title,
                description,
                questions,
                courseId,
                createdBy,
            },
            { new: true },
        );

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
