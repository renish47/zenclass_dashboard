const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = Schema(
    {
        courseName: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        syllabusLink: {
            type: String,
            required: true
        },
        batchList: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Batch'
            }
        ],
        lessonList: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lesson'
            }
        ]
    }
)

module.exports = mongoose.model("Course", courseSchema);