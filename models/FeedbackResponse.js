import mongoose from "mongoose";

const FeedbackResponseSchema = new mongoose.Schema(
    {
        feedbackId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback",
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
        responses: {
            // { "questionId": "response"}
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const FeedbackResponse = mongoose.model("FeedbackResponse", FeedbackResponseSchema);

export default FeedbackResponse;
