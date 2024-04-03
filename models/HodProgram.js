import mongoose from "mongoose";

const HodProgramSchema = new mongoose.Schema({
    hodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hod",
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
    },
}, {
    timestamps: true,
});

const HodProgram = mongoose.model("HodProgram", HodProgramSchema);

export default HodProgram;
