import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema({
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
	totalMarks: {
		type: Number,
		required: true,
	},
	parameters: [],
});

const Scheme = mongoose.model("Scheme", SchemeSchema);

export default Scheme;
