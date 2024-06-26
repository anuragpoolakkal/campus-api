import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["M", "F"],
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["admin", "principal", "faculty", "student", "parent"],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model("User", UserSchema);

export default User;
