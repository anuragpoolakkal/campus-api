import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    vision: {
        type: String,
    },
    mission: {
        type: String,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const College = mongoose.model("College", CollegeSchema);

export default College;
