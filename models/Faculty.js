import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["hod", "tutor", "teacher"],
            required: true,
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Faculty = mongoose.model("Faculty", FacultySchema);

export default Faculty;
