import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
    },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },
    courseCode: {
        type: String,
    },
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
