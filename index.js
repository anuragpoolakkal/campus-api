import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/User.js";
import collegeRoutes from "./routes/College.js";
import schemeRoutes from "./routes/Scheme.js";
import departmentRoutes from "./routes/Department.js";
import facultyRoutes from "./routes/Faculty.js";
import feedbackRoutes from "./routes/feedback.js";
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
