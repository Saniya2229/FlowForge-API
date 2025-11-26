// routes/applications.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    getEmployerApplications,
    updateApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// Get all applications for the logged-in employer
router.get("/", authMiddleware, getEmployerApplications);

// Update specific application
router.put("/:id", authMiddleware, updateApplication);

export default router;
