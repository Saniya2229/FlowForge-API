// controllers/jobController.js
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export async function createJob(req, res) {
  const { title, description, location, salaryRange, jobType } = req.body;
  const job = await Job.create({
    employer: req.user.userId,
    title,
    description,
    location,
    salaryRange,
    jobType,
  });
  res.json(job);
}

export async function updateJob(req, res) {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Not found" });
  if (job.employer.toString() !== req.user.userId.toString())
    return res.status(403).json({ message: "Not allowed" });

  Object.assign(job, req.body);
  await job.save();
  res.json(job);
}

export async function getJob(req, res) {
  const job = await Job.findById(req.params.id).populate(
    "employer",
    "company name email"
  );
  if (!job) return res.status(404).json({ message: "Not found" });
  res.json(job);
}

export async function listJobs(req, res) {
  const jobs = await Job.find().populate("employer", "company name");
  res.json(jobs);
}

// Get employer's own jobs with applicant counts
export async function getMyJobs(req, res) {
  try {
    const jobs = await Job.find({ employer: req.user.userId }).populate(
      "employer",
      "company name email"
    );

    // Get applicant counts for each job
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({ job: job._id });
        return { ...job.toObject(), applicantsCount: count };
      })
    );

    res.json(jobsWithCounts);
  } catch (err) {
    console.error("getMyJobs error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function applyToJob(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if job exists
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if already applied
    const existing = await Application.findOne({ job: id, applicant: userId });
    if (existing) {
      return res.status(400).json({ message: "You have already applied to this job" });
    }

    // Create application
    const application = await Application.create({
      job: id,
      applicant: userId,
      // resume: req.body.resumeId // Optional: if we want to link specific resume
    });

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteJob(req, res) {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Not found" });
  if (job.employer.toString() !== req.user.userId.toString())
    return res.status(403).json({ message: "Not allowed" });
  await job.deleteOne();
  res.json({ message: "Deleted" });
}
