import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
	semesterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Semester",
	},
	collegeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "College",
	},
});

const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;
