import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema({
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
	totalMarks: {
		type: Number,
		required: true,
	},
	parameters: [
		{
			name: {
				type: String,
				required: true,
			},
			weightage: {
				type: Number,
				required: true,
				min: 0,
				max: 100,
			},
		}
	],
}, {
	timestamps: true,
});

const Scheme = mongoose.model("Scheme", SchemeSchema);

export default Scheme;
