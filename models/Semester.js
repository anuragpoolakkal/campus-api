import mongoose from "mongoose";

const SemesterSchema = new mongoose.Schema({
	collegeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "College",
	},
	batchId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Batch",
	},
});

const Semester = mongoose.model("Semester", SemesterSchema);

export default Semester;
