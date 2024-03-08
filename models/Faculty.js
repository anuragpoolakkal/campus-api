import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
	name:{
		type: String,
	},
	email:{
		type: String,
	},
	title: {
		type: String,
		required: true,
	},
	deptId: {
		type: String,
		required: true,
	},
	collegeId: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	courses: [
		{	
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
}, {
	timestamps: true,
});

const Faculty = mongoose.model("Faculty", FacultySchema);

export default Faculty;
