import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema({
	semesterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Semester",
	},
	startYear: {
		type: String,
		required: true,
	},
});

const Batch = mongoose.model("Batch", BatchSchema);

export default Batch;
