import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	deptId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Department",
	},
	collegeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "College",
	},
}, {
	timestamps: true,
});

const Program = mongoose.model("Program", ProgramSchema);

export default Program;
