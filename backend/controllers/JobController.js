import Job from '../models/JobModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Get all jobs
// @route   GET /api/jobs/
// @access  Private/Admin
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({}).populate('user', 'id username')
  res.json({ jobs })
})

// @desc    Get a users Jobs
// @route   GET /api/jobs/myjobs
// @access  Private
const getUserJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user._id })
  res.json({ jobs })
})

// @desc    GET a single job
// @route   GET /api/jobs/:id
// @access  Private
const getSingleJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
  res.json(job)
})

// @desc    Create a new Job
// @route   POST /api/jobs
// @access  Private
const createJob = asyncHandler(async (req, res) => {
  const {
    jobTitle,
    jobDescription,
    companyJobId,
    companyName,
    jobUrl,
    jobCity,
    jobState,
    jobCountry
  } = req.body

  const job = new Job({
    jobTitle,
    user: req.user._id,
    jobDescription,
    companyJobId,
    companyName,
    jobUrl,
    jobCity,
    jobState,
    jobCountry
  })

  const createdJob = await Job.create(job)

  res.status(201).json(createdJob)
})

export {
  getJobs,
  getUserJobs,
  createJob,
  getSingleJob
}