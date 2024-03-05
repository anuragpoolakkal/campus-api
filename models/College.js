import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

const College = mongoose.model("College", CollegeSchema);

export default College;
