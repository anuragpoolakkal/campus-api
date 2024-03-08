import mongoose from "mongoose";

const InternalMarkSchema = new mongoose.Schema({
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
	},
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
    marks: {
        type: Number,
    },
}, {
	timestamps: true,
});

const InternalMark = mongoose.model("InternalMark", InternalMarkSchema);

export default InternalMark;
