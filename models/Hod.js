import mongoose from "mongoose";

const HodSchema = new mongoose.Schema(
    {
        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty",
            required: true,
        },
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
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

const Hod = mongoose.model("Hod", HodSchema);

export default Hod;
