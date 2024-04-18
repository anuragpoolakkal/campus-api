import express from "express";
import batchController from "../controllers/batch.controller.js";
import { validateAdmin } from "../middlewares/userValidation.js";

const router = express.Router();

router.get("/", validateAdmin, batchController.getBatches);
router.get("/:id", validateAdmin, batchController.getBatchById);
router.post("/", validateAdmin, batchController.createBatch);
router.put("/:id", validateAdmin, batchController.updateBatch);
router.delete("/:id", validateAdmin, batchController.deleteBatch);

export default router;
