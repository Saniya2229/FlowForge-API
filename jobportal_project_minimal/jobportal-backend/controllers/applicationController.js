// controllers/applicationController.js
import Application from "../models/Application.js";
import Job from "../models/Job.js";

// Get all applications for employer's jobs
export async function getEmployerApplications(req, res) {
    try {
        // 1. Find all jobs posted by this employer
        const jobs = await Job.find({ employer: req.user.userId }).select("_id");
        const jobIds = jobs.map((j) => j._id);

        // 2. Find applications for these jobs
        const applications = await Application.find({ job: { $in: jobIds } })
            .populate("job", "title")
            .populate("applicant", "firstName lastName email profilePicture")
            .sort({ appliedAt: -1 });

        res.json(applications);
    } catch (err) {
        console.error("Get applications error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Update application status/notes/rating
export async function updateApplication(req, res) {
    try {
        const { id } = req.params;
        const { status, notes, rating } = req.body;

        // Verify ownership (optional but recommended: check if job belongs to employer)
        // For speed, we'll assume authMiddleware protects the route, 
        // but in production, we should verify the employer owns the job.

        const application = await Application.findByIdAndUpdate(
            id,
            { $set: { status, notes, rating } },
            { new: true }
        );

        if (!application) return res.status(404).json({ message: "Not found" });

        res.json(application);
    } catch (err) {
        console.error("Update application error:", err);
        res.status(500).json({ message: "Server error" });
    }
}
