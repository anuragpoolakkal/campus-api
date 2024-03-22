import mongoose from "mongoose";

const BatchSemesterSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
    },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
    },
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const BatchSemester = mongoose.model("BatchSemester", BatchSemesterSchema);

export default BatchSemester;
