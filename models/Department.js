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
	hodId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Faculty",
	},
	vision: {
		type: String,
	},
	mission: {
		type: String,
	},
}, {
	timestamps: true,
});

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;
