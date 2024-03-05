import mongoose from "mongoose";

const TimeTableSchema = new mongoose.Schema({
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
});

const TimeTable = mongoose.model("TimeTable", TimeTableSchema);

export default TimeTable;
