import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        semesterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semester",
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }, {
    timestamps: true,
}
);

const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;
