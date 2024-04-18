import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema({
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
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
        required: true,
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

const Batch = mongoose.model("Batch", BatchSchema);

export default Batch;
