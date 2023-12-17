const express = require('express')
const CourseRouter = require('./routers/courseRouter')
const app = express()

// Middleware
app.use(express.json()) // *  parse incoming json data

// Defined Routes
app.use('/api/v1/courses', CourseRouter)


module.exports = app