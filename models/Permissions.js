import mongoose from "mongoose";

const PermissionsSchema = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
    },
    admin: {
        type: Array,
        default: [],
    },
    principal: {
        type: Array,
        default: [],
    },
    faculty: {
        type: Array,
        default: [],
    },
    student: {
        type: Array,
        default: [],
    },
});

const Permissions = mongoose.model("Permissions", PermissionsSchema);

export default Permissions;
