import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import asyncHandler from 'express-async-handler'

// checks the user is allowed to access private routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // this checks if token exists and if it is a bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // splits the auth and puts the JWT token into the var
      token = req.headers.authorization.split(' ')[1]

      // verifies the token using JWT and the JWT_SECRET from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // gets user and the .select stops password from being stored in req
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized to access, token failed')
    }
  }

  // if there is no token then it fails
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

// another function that checks for admins will be here
const admin = asyncHandler(async (req, res, next) => {
  const user = req.user
  if (user && user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
})

export {
  protect,
  admin
}