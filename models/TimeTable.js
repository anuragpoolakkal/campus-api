import mongoose from "mongoose";

const TimeTableSchema = new mongoose.Schema({
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
}, {
	timestamps: true,
});

const TimeTable = mongoose.model("TimeTable", TimeTableSchema);

export default TimeTable;
