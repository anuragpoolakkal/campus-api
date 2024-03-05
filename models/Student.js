import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	admNo: {
		type: String,
		required: true,
	},
	rollNo: {
		type: String,
		required: true,
	},
	batchId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Batch",
	},
	collegeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "College",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	courses: {},
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
