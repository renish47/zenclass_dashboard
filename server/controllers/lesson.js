const Course = require("../models/course");
const Lesson = require("../models/lesson")

exports.createLesson = async (req, res, next) => {
    const { moduleNo, lessonName, chapters, courseId } = req.body
    try {
        let lesson = await Lesson.findOne({ lessonName });
        if (lesson) {
            const error = new Error("Lesson with this Name already exist")
            error.status = 400
            throw error
        }

        const newLesson = new Lesson({
            moduleNo, lessonName, chapters
        })
        let course = await Course.findById(courseId)
        course.lessonList.push(newLesson._id)
        await course.save()
        await newLesson.save();
        res.status(201).json({
            message: "New Lesson Created Successfully"
        })

    } catch (error) {
        next(error)
    }
}

exports.getLessonList = async (req, res, next) => {
    try {
        const { id } = req.params
        const lesson = await Lesson.findById(id)
        if (!lesson) {
            const error = new Error("Lesson Not Found")
            error.status = 404
            throw error
        }
        res.status(201).json({
            message: "lesson fetched successfully", lesson
        })
    } catch (error) {

    }
}