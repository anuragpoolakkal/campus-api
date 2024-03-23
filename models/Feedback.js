import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        questions: [
            {
                question: {
                    type: String,
                    required: true,
                },
                settings: {
                    type: {
                        type: String,
                        enum: ["text", "longtext", "multiplechoice", "rating"],
                        required: true,
                    },
                    options: {
                        type: Array,
                        required: false,
                    },
                    min: {
                        type: Number,
                        required: false,
                    },
                    max: {
                        type: Number,
                        required: false,
                    },
                },
            },
        ],
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    },
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
