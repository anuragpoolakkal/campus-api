import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
	semesterid: {
		type: String,
		required: true,
	},
	deptId: {
		type: String,
		required: true,
	},
	collegeId: {
		type: String,
		required: true,
	},
});

const Faculty = mongoose.model("Faculty", FacultySchema);

export default Faculty;
