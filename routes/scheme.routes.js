import express from "express";

import schemeController from "../controllers/scheme.controller.js";

const router = express.Router();

router.get("/", schemeController.getSchemeByCourse);
router.get("/:id", schemeController.getSchemeById);
router.post("/", schemeController.createScheme);
router.put("/:id", schemeController.updateScheme);
router.delete("/:id", schemeController.deleteScheme);

export default router;
