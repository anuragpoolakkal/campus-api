import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import collegeRoutes from "./routes/college.js";
import schemeRoutes from "./routes/scheme.js";
import departmentRoutes from "./routes/department.js";
import facultyRoutes from "./routes/faculty.js";
import feedbackRoutes from "./routes/feedback.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello Campus API</h1>");
});

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

app.use("/users", userRoutes);
app.use("/college", collegeRoutes);
app.use("/scheme", schemeRoutes);
app.use("/department", departmentRoutes);
app.use("/faculty", facultyRoutes);
app.use("/feedback", feedbackRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
