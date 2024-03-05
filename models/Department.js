import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
	semesterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Semester",
	},
	collegeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "College",
	},
});

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;
