import mongoose from "mongoose";

const ExamRegistrationSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    },
);

const ExamRegistration = mongoose.model("ExamRegistration", ExamRegistrationSchema);

export default ExamRegistration;
