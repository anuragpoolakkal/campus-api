import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import collegeRoutes from "./routes/college.js";

const app = express();


mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));





app.get("/", (req, res) => {
	res.send("Hello from campus API");
});

app.use("/college", collegeRoutes);

