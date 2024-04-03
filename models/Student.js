import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        admNo: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        rollNo: {
            type: String,
            required: true,
        },
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Student = mongoose.model("Student", StudentSchema);

export default Student;
