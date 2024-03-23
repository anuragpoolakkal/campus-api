import mongoose from "mongoose";

const CourseEnrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
});

const CourseEnrollment = mongoose.model("CourseEnrollment", CourseEnrollmentSchema);

export default CourseEnrollment;
