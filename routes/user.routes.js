import express from "express";
import userController from "../controllers/user.controller.js";
import { validateAdmin, validateUser } from "../middlewares/userValidation.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/welcome", userController.welcome);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.patch("/updatepassword", userController.updatePassword);
router.get("/:id", validateUser, userController.getById);
router.post("/verify", validateUser, userController.verifyUser);
router.post("/permissions", validateAdmin, userController.getPermissions);
router.post("/permissions/reset", validateAdmin, userController.resetPermissions);
router.post("/permissions/update", validateAdmin, userController.updatePermissions);

export default router;
