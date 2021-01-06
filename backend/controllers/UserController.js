import User from '../models/UserModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateTokens.js'

// @desc    Gets all users
// @route   GET /api/users/
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Gets a single user
// @route   GET /api/users/profile
// @access  Private
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User does not exist')
  }
})

// @desc    Updates user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    // assigns new value if there or keeps old if not
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    // must check if submitted new password and do not want to assign user.password
    // this would change the users password to be the hash value and we dont want that here haha
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User does not exist')
  }
})

// @desc    Register a User
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(401)
    throw new Error(`User already exists`)
  }

  const user = await User.create({
    username,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400)
    throw new Error('Invalid User data')
  }
})

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email });

  // checks if the user exists and if the passwords match
  if (user && (await user.comparePasswords(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('invalid username or password')
  }

})


export {
  registerUser,
  loginUser,
  getSingleUser,
  getAllUsers,
  updateProfile
}
