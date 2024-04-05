import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import FeedbackController from "../controllers/feedback.controller.js";
const router = express.Router();

router.get("/", validateAdmin, FeedbackController.getFeedback);
router.get("/:id", validateUser, FeedbackController.getFeedbackById);
router.post("/", validateUser, FeedbackController.createFeedback);
router.put("/:id", validateUser, FeedbackController.updateFeedback);
router.delete("/:id", validateUser, FeedbackController.deleteFeedback);

export default router;