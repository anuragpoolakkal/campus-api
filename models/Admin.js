import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	collegeId: {
		type: String,
		required: true,
	},
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
