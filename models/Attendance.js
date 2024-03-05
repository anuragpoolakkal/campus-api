import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
	},
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
