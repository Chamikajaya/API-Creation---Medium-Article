const Course = require('../models/courseModel')
const APIFeatures = require('../utils/APIFeatures')


// @desc --> Get one course
// GET /api/v1/courses/:id

//  asynchronous function to handle the request for a single course.
const getSingleCourse = async (req, res) => {
    try {
        // Attempt to find the course by its ID, which is passed in the request parameters.
        const course = await Course.findById(req.params.id)

        // If successful, send a 200 status response with the course data.
        res.status(200).json({
            status: "successful",
            courseData: course
        })
    } catch (error) {
        // If an error occurs (e.g., course not found), send a 404 status response with the error message.
        res.status(404).json({
            status: "failed",
            message: error.message
        })
    }
}

// @desc --> create a course
// POST /api/v1/courses

//  asynchronous function to handle the creation of a new course.
const createCourse = async (req, res) => {
    try {
        // Create a new course using the data provided in the request body.

        const newCourse = await Course.create(req.body)

        // If the course is successfully created, send a 201 status response (Created) with the new course data.
        res.status(201).json({
            status: "successful",
            courseData: newCourse
        })
    } catch (error) {
        // If an error occurs during the creation process (e.g., validation error), send a 400 status response (Bad Request) with the error message.
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}

// asynchronous function to handle updating a course.

const updateCourse = async (req, res) => {
    try {

        // The function updates the course with data from the request body.
        // Options: 
        // 'returnDocument: after' ensures that the updated document is returned.
        // 'runValidators: true' ensures that the update operation respects the schema validations.
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after', runValidators: true }
        )


        // If the update is successful, send a 200 status response with the updated course data.

        res.status(200)
            .json({
                status: "successfully updated",
                updatedCourse: updatedCourse

            })
    }
    catch (error) {
        res.status(404).json({
            status: "unsuccessful",
            errMsg: error.message
        })
    }
}


// @desc --> delete a course 
// DELETE /api/v1/courses/:id

//  asynchronous function to handle the deletion of a course.
const deleteCourse = async (req, res) => {
    try {
        // Attempt to delete the course specified by the ID in the request parameters.
        await Course.findByIdAndDelete(req.params.id)

        // If the deletion is successful, send a 204 status response (No Content).
        // This status code is used because there is no content to send in the response body for a deletion.
        res.status(204).json({ status: "successful deletion" })
    } catch (error) {

        res.status(404).json({
            status: "unsuccessful",
            errMsg: error.message
        })
    }
}

const getAllCourses = async (req, res) => {
    try {
        // Create a new APIFeatures instance with the Mongoose query and the query string from the request.
        const features = new APIFeatures(Course.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()

        // Execute the query and store the results in a variable.
        const courses = await features.query

        // Send a 200 status response with the courses data.
        res.status(200).json({
            status: "successful",
            numResults: courses.length,
            coursesData: courses
        })
    } catch (error) {
        // If an error occurs, send a 404 status response with the error message.
        res.status(404).json({
            status: "failed",
            message: error.message
        })
    }
}


module.exports = { getSingleCourse, createCourse, updateCourse, deleteCourse, getAllCourses }