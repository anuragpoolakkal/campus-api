import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
	},
	semesterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Semester",
	},
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
	date: {
		type: Date,
		required: true,
	},
	hour: {
		type: Number,
		required: true,
	},
	present: {
		type: Boolean,
		default: false,
	},
	facultyId: {
		type: type: mongoose.Schema.Types.ObjectId,
		ref: "Faculty",
	}
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
