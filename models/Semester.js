import mongoose from "mongoose";

const SemesterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
        },
        programId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program",
        },
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        }
    },
    {
        timestamps: true,
    },
);

const Semester = mongoose.model("Semester", SemesterSchema);

export default Semester;
