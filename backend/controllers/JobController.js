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

// @desc    Update a job app
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
  const {
    jobTitle,
    jobDescription,
    companyJobId,
    companyName,
    jobUrl,
    jobCity,
    jobState,
    jobCountry,
    isImportant,
    hasApplied,
    heardBack,
    haveInterviewed,
    haveOffer
  } = req.body

  if (job) {
    // assign new values or use old values if no new values
    job.jobTitle = jobTitle || job.jobTitle
    job.jobDescription = jobDescription || job.jobDescription
    job.companyJobId = companyJobId || job.companyJobId
    job.companyName = companyName || job.companyName
    job.jobUrl = jobUrl || job.jobUrl
    job.jobCity = jobCity || job.jobCity
    job.jobState = jobState || job.jobState
    job.jobCountry = jobCountry || job.jobCountry
    job.isImportant = isImportant || job.isImportant
    job.hasApplied = hasApplied || job.hasApplied
    job.heardBack = heardBack || job.heardBack
    job.haveInterviewed = haveInterviewed || job.haveInterviewed
    job.haveOffer = haveOffer || job.haveOffer

    // update the job in the database
    const updatedJob = await job.save()

    res.json({
      _id: updatedJob._id,
      jobTitle: updatedJob.jobTitle,
      jobDescription: updatedJob.jobDescription,
      companyJobId: updatedJob.companyJobId,
      companyName: updatedJob.companyName,
      jobUrl: updatedJob.jobUrl,
      jobCity: updatedJob.jobCity,
      jobState: updatedJob.jobState,
      jobCountry: updatedJob.jobCountry,
      isImportant: updatedJob.isImportant,
      hasApplied: updatedJob.hasApplied,
      heardBack: updatedJob.heardBack,
      haveInterviewed: updatedJob.haveInterviewed,
      haveOffer: updatedJob.haveOffer
    })
  } else {
    res.status(404)
    throw new Error('Job could not be found')
  }
})

export {
  getJobs,
  getUserJobs,
  createJob,
  getSingleJob,
  updateJob
}