import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/welcome", userController.welcome);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.patch("/updatepassword", userController.updatePassword);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getById);
router.get("/verify", userController.verifyUser);

export default router;
