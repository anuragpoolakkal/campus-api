import mongoose from "mongoose";

const StudentCourseSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
}, {
    timestamps: true,
});

const StudentCourse = mongoose.model("StudentCourse", StudentCourseSchema);

export default StudentCourse;
