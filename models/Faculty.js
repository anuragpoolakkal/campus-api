import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        deptId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        },
        role: {
            type: String,
            required: true,
            enum: ["hod", "tutor", "teacher"]
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    },
);

const Faculty = mongoose.model("Faculty", FacultySchema);

export default Faculty;
