const { getSingleCourse, createCourse, updateCourse, deleteCourse, getAllCourses } = require('../controllers/courseController')
const express = require('express')
const router = express.Router()


router.route('/').post(createCourse).get(getAllCourses)
router.route('/:id').get(getSingleCourse).patch(updateCourse).delete(deleteCourse)



module.exports = router