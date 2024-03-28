import mongoose from "mongoose";

const PrincipalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },
});

const Principal = mongoose.model("Principal", PrincipalSchema);

export default Principal;
