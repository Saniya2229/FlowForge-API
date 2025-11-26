// routes/users.js
import { Router } from "express";
const router = Router();

import authMiddleware from "../middleware/authMiddleware.js";
import {
  me,
  update,
  submitFullProfile,
  getDashboardInfo,
} from "../controllers/userController.js";

router.get("/me", authMiddleware, me);
router.put("/me", authMiddleware, update);
router.post("/profile/submit", authMiddleware, submitFullProfile);
router.get("/dashboard", authMiddleware, getDashboardInfo);

export default router;
