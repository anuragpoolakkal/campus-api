import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema({
	semesterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Semester",
	},
	programId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Program",
	},
	name: {
		type: String,
		required: true,
	},
	startYear: {
		type: Number,
		required: true,
	},
	endYear: {
		type: Number,
		required: true,
	}
});

const Batch = mongoose.model("Batch", BatchSchema);

export default Batch;
