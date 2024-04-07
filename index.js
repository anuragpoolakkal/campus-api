import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import collegeRoutes from "./routes/college.routes.js";
import programRoutes from "./routes/program.routes.js";
import schemeRoutes from "./routes/scheme.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import studentRoutes from "./routes/student.routes.js";
import batchRoutes from "./routes/batch.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import courseRoutes from "./routes/course.routes.js";
import cors from "cors";
import morgan from "morgan";
import { validateAdmin, validateUser } from "./middlewares/userValidation.js";
import rfs from "rotating-file-stream";
import logger from "./utils/logger.js";

const app = express();
dotenv.config();
app.use(cors());

mongoose.set("strictQuery", true);
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info("Connected to the database");
    })
    .catch((err) => {
        logger.error(err);
    });

app.get("/", (req, res) => {
    res.send("<h1>Hello Campus API</h1>");
});

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: "./logs",
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

app.use("/college", collegeRoutes);
app.use("/course", courseRoutes);
app.use("/users", userRoutes);
app.use("/program", programRoutes);
app.use("/scheme", schemeRoutes);
app.use("/department", departmentRoutes);
app.use("/batch", batchRoutes);
app.use("/faculty", facultyRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/student", studentRoutes);
// app.use("/program", programRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
