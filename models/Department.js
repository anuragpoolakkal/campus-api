import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true,
        },
        vision: {
            type: String,
        },
        mission: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;
