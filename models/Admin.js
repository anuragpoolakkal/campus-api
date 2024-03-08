import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	collegeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "College",
	},
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
