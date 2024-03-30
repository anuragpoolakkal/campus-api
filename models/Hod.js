import mongoose from "mongoose";

const HodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
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

const Hod = mongoose.model("Hod", HodSchema);

export default Hod;
