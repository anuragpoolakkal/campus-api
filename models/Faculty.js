import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["hod", "tutor", "teacher"]
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
