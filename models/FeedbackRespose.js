import mongoose from "mongoose";

const FeedbackResponseSchema = new mongoose.Schema({
	feedbackId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Feedback",
	},
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
	},
	response: {},
});

const FeedbackResponse = mongoose.model("FeedbackResponse", FeedbackResponseSchema);

export default FeedbackResponse;
