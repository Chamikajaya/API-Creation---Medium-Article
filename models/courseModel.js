const mongoose = require('mongoose')
const slugify = require('slugify')

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: [true, 'A course must have a name'],
        minlength: [5, 'Title must be at least 5 characters.'],

        validate: {  // custom validator

            validator: function (value) {
                return /^[A-Za-z0-9\s]+$/.test(value)
            },

            message: 'Course title can only have letters, numbers and spaces only'

        }


    },

    slug: String,

    description: {
        type: String,
        required: [true, 'A summary must be given about the course'],
        trim: true,
    },

    instructor: {
        type: String,
        required: [true, 'A course must have an instructor']
    },

    category: String,

    difficultyLevel: {
        type: String,
        required: [true, 'Difficulty level must be given'],
        enum: {
            values: ["Beginner", "Intermediate", "Advanced"],
            message: "Difficulty must be ==> (Beginner, Intermediate, Advanced) "
        }
    },

    duration: {
        type: Number,
        required: [true, 'Duration in weeks must be given'],
    },

    startDates: [Date],

    price: {
        type: Number,
        required: [true, 'Course must have a price'],
        min: [0, 'Price must be greater than 0']

    },

    avgRating: {

        type: Number,
        default: 0

    },

    reviewQuantity: {
        type: Number,
        default: 0
    },

    prerequisites: {
        type: [String],
        default: 'No prerequisites.'
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        select: false  // since select is false we will never send createdAt field as response (security reasons,... 🙀)
    },


}, { toJSON: { virtuals: true } })


// Virtual properties in Mongoose
courseSchema.virtual('formattedDuration').get(function () {


    const weeks = Math.floor(this.duration / 7)

    const days = this.duration % 7

    return `${weeks} weeks ${days} days`

})

// Pre Save hook  - Mongoose middleware
courseSchema.pre('save', function (next) {

    this.slug = slugify(this.title, { lower: true })
    next()  // call next to pass control to the next handler
})

const CourseModel = mongoose.model('CourseModel', courseSchema)

module.exports = CourseModel
