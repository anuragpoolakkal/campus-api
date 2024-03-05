import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
	res.send("API for Campus Management System");
});

const port = process.env.PORT || 8080;

app.listen(8080, () => {
	console.log(`Server at http://localhost:${port}`);
});
