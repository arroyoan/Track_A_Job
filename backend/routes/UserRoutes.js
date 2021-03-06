import express from 'express'
import {
  registerUser,
  loginUser,
  getSingleUser,
  getAllUsers,
  updateProfile,
  deleteUser
} from '../controllers/UserController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(protect, admin, getAllUsers)

router.route('/:id')
  .delete(protect, deleteUser)

// this route will be protected but middle ware not made yet
router.route('/profile')
  .get(protect, getSingleUser)
  .put(protect, updateProfile)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

export default router

