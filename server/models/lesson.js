const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = Schema(
    {
        moduleNo: {
            type: Number,
            required: true,
            unique: true
        },
        lessonName: {
            type: String,
            required: true
        },
        chapters: [{
            chapterName: String
        }]
    }
)

module.exports = mongoose.model("Lesson", lessonSchema);