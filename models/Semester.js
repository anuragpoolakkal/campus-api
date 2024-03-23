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
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
        },
        programId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program",
        },
    },
    {
        timestamps: true,
    },
);

const Semester = mongoose.model("Semester", SemesterSchema);

export default Semester;
