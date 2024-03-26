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
            enum: ["principal", "teacher", "tutor"],
        },
        deptId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
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
    },
    {
        timestamps: true,
    },
);

const Faculty = mongoose.model("Faculty", FacultySchema);

export default Faculty;
