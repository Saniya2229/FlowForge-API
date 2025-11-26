// routes/resumes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createResume,
  getMyResumes,
  generateResumePdf,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/create", authMiddleware, createResume);
router.get("/my", authMiddleware, getMyResumes);
router.post("/pdf", authMiddleware, generateResumePdf);

export default router;
