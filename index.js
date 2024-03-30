import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import collegeRoutes from "./routes/college.routes.js";
import schemeRoutes from "./routes/scheme.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import programRoutes from "./routes/program.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import courseRoutes from "./routes/course.routes.js";
import cors from "cors";
import morgan from "morgan";

const app = express();
dotenv.config();
app.use(cors());
app.use(morgan("dev"));

mongoose.set("strictQuery", true);
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

app.get("/", (req, res) => {
    res.send("<h1>Hello Campus API</h1>");
});

app.use("/college", collegeRoutes);
app.use("/course", courseRoutes);
app.use("/users", userRoutes);
app.use("/scheme", schemeRoutes);
// app.use("/department", departmentRoutes);
// app.use("/faculty", facultyRoutes);
// app.use("/feedback", feedbackRoutes);
// app.use("/student", studentRoutes);
// app.use("/program", programRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
