import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
	semesterid: {
		type: String,
		required: true,
	},
	collegeId: {
		type: String,
		required: true,
	},
});

const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;
