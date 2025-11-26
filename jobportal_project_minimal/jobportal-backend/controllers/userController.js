// controllers/userController.js
import User from "../models/User.js";

/**
 * GET /api/users/me
 * Return logged-in user info
 */
export async function me(req, res) {
  try {
    const user = await User.findById(req.user.userId).lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("me error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/**
 * PUT /api/users/me
 * Update partial profile fields (flat object)
 */
export async function update(req, res) {
  try {
    const userId = req.user.userId;
    const payload = req.body; // flat structure

    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: payload },
      { new: true }
    ).lean();

    res.json(updated);
  } catch (err) {
    console.error("update error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/**
 * POST /api/users/profile/submit
 * Final profile submit (after finishing ProfileSteps)
 */
export async function submitFullProfile(req, res) {
  try {
    const userId = req.user.userId;

    // Remove email from the payload to avoid duplicate key error
    // Email should not be changed during profile update
    const { email, ...profileData } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...profileData, // full draft without email
          profileCompleted: true,
        },
      },
      { new: true }
    ).lean();

    res.json({
      message: "Profile submitted successfully",
      user: updated,
    });
  } catch (err) {
    console.error("submit profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getDashboardInfo(req, res) {
  try {
    res.json({
      name: req.user.firstName,
      profileCompletion: req.user.profileCompletion || 0,
      education: req.user.currentEducation_degree || "",
      internships: req.user.internships?.length || 0,
      documents: req.user.documents?.length || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
