import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },
    courseCode: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
