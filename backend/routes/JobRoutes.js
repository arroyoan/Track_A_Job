import express from 'express'
import {
  createJob,
} from '../controllers/JobController.js'

const router = express.Router()

// middleware like authorizing user is logged in

router.route('/')
  .post(createJob)

export default router