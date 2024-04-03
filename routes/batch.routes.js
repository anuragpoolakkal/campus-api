import batchController from "../controllers/batch.controller";
// import { validateAdmin } from "../middlewares/userValidation";
import express from "express";

const router = express.Router();

router.get("/", batchController.getBatches);
router.get("/:id", batchController.getBatchById);
router.post("/", batchController.createBatch);
router.put("/:id", batchController.updateBatch);
router.delete("/:id", batchController.deleteBatch);
