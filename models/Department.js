import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	collegeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "College",
	},
});

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;
