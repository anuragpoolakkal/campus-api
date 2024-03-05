import mongoose from "mongoose";

const ParentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	phone: {
		type: String,
	},
});

const Parent = mongoose.model("Parent", ParentSchema);

export default Parent;
