import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
        semesterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semester",
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
        },
        result: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
);

const Result = mongoose.model("Result", ResultSchema);

export default Result;
