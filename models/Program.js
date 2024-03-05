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
});

const Program = mongoose.model("Program", ProgramSchema);

export default Program;
