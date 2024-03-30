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
    },
    {
        timestamps: true,
    },
);

const Hod = mongoose.model("Hod", HodSchema);

export default Hod;
