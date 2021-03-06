import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import path from 'path'
import mongoSanitize from 'express-mongo-sanitize'

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

// sanizes data from user
app.use(mongoSanitize())

// mount the routes
app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}

// custom error middleware
app.use(notFound)
app.use(errorHandler)


// Gets port from .env but if no port found it goes to 5000
const PORT = process.env.PORT || 5000

// Server starts listening
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow))
