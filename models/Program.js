import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        hodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hod",
            required: true,
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Program = mongoose.model("Program", ProgramSchema);

export default Program;
