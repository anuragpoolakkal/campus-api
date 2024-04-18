import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
    },
    deptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
    name: {
        type: String,
        required: true,
    },
    startYear: {
        type: Number,
        required: true,
    },
    endYear: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

const Batch = mongoose.model("Batch", BatchSchema);

export default Batch;
