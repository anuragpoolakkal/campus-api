import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
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

const Course = mongoose.model("Course", CourseSchema);

export default Course;
