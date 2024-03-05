import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	facultyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Faculty",
	},
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
