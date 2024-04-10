import express from "express";
//import { validateAdmin, validateUser } from "../middlewares/userValidation";
import batchController from "../controllers/batch.controller.js";

const router = express.Router();

router.get("/", batchController.getBatches);
router.get("/:id", batchController.getBatchById);
router.post("/", batchController.createBatch);
router.put("/:id", batchController.updateBatch);
router.delete("/:id", batchController.deleteBatch);

export default router;
