import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import facultyRoutes from "./routes/faculty.js";

const app = express();

dotenv.config();

mongoose.set("strictQuery", true);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

app.use("/faculty", facultyRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
