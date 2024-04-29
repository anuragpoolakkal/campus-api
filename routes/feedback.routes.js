import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import feedbackController from "../controllers/feedback.controller.js";
const router = express.Router();

router.get("/", validateUser, feedbackController.getFeedback);
router.get("/:id", validateUser, feedbackController.getFeedbackById);
router.post("/", validateUser, feedbackController.createFeedback);
router.put("/:id", validateUser, feedbackController.updateFeedback);
router.delete("/:id", validateUser, feedbackController.deleteFeedback);
router.post("/generate-questions-using-ai", validateUser, feedbackController.generateQuestionsUsingAI);

export default router;