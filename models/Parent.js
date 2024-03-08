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
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
}, {
	timestamps: true,
});

const Parent = mongoose.model("Parent", ParentSchema);

export default Parent;
