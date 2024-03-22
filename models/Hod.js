import mongoose from "mongoose";

const HodSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

const Hod = mongoose.model("Hod", HodSchema);

export default Hod;
