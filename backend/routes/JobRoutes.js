import express from 'express'
import {
  getJobs,
  createJob,
  getUserJobs,
  getSingleJob,
  updateJob,
  deleteJob
} from '../controllers/JobController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// middleware like authorizing user is logged in

router.route('/')
  .post(protect, createJob)
  .get(protect, getJobs)

router.route('/myjobs')
  .get(protect, getUserJobs)

router.route('/:id')
  .get(protect, getSingleJob)
  .put(protect, updateJob)
  .delete(protect, deleteJob)



export default router