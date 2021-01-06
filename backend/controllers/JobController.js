import Job from '../models/JobModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Create a new Job
// @route   POST /api/
// @access  Private
const createJob = asyncHandler(async (req, res) => {
  res.send({ message: 'this is a test message' })
})

export {
  createJob
}