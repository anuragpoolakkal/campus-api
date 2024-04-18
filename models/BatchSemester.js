import mongoose from "mongoose";

const BatchSemesterSchema = new mongoose.Schema(
    {
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semester",
            required: true,
        },
        programId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program",
            required: true,
        },
        semesterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semester",
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }, {
    timestamps: true,
}
);

const BatchSemester = mongoose.model("BatchSemester", BatchSemesterSchema);

export default BatchSemester;
