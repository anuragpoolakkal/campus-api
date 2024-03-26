import mongoose from "mongoose";

const FacultyCourseSchema = new mongoose.Schema(
    {
        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty",
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    },
    {
        timestamps: true,
    },
);

const FacultyCourse = mongoose.model("FacultyCourse", FacultyCourseSchema);

export default FacultyCourse;
