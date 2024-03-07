import mongoose from "mongoose";

const TimeTableSchema = new mongoose.Schema({
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
	day: {
		type: String,
		required: true,
	},
	hour: {
		type: Number,
		required: true,
	},
	facultyId: {
		type: type: mongoose.Schema.Types.ObjectId,
		ref: "Faculty",
	}
});

const TimeTable = mongoose.model("TimeTable", TimeTableSchema);

export default TimeTable;
