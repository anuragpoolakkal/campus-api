import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
