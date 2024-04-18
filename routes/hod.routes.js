import express from "express";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";
import hodController from "../controllers/hod.controller.js";
const router = express.Router();

router.get("/", validateAdmin, hodController.getHods);
router.get("/:id", validateUser, hodController.getHodById);
router.post("/", validateUser, hodController.createHod);
router.put("/:id", validateUser, hodController.updateHod);
router.delete("/:id", validateUser, hodController.deleteHod);

export default router;