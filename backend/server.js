import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'

import connectDB from './config/db.js'
import userRoutes from './routes/UserRoutes.js'
import jobRoutes from './routes/JobRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// Bring in the Environment variables
dotenv.config()

// Connect to the database
connectDB()

// Set up Express to connect routes
const app = express();

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// mount the routes
app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)

// custom error middleware
app.use(notFound)
app.use(errorHandler)

// Gets port from .env but if no port found it goes to 5000
const PORT = process.env.PORT || 5000

// Server starts listening
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow))
