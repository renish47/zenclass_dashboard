const Course = require("../models/course")
const Batch = require("../models/batch")

exports.createCourse = async (req, res, next) => {
    const { courseName, duration, syllabusLink } = req.body
    try {
        let course = await Course.findOne({ courseName });
        if (course) {
            const error = new Error("Course with this Name already exist")
            error.status = 403
            throw error
        }
        else {
            const newCourse = new Course({
                courseName, duration, syllabusLink
            })
            const data = await newCourse.save();
            res.status(201).json({
                message: "New Course Created Successfully",
                data
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.addBatchToCourse = async (req, res, next) => {
    try {
        const { batchId, courseId } = req.body;
        let course = await Course.findById(courseId);
        if (!course) {
            const error = new Error("No batch found with the provided batch id.")
            error.status = 404
            throw error
        }
        else {
            let batch = await Batch.findById(batchId)
            if (!batch) {
                res.status(404).json({
                    message: "No batch found with the provided batch id."
                })
            }
            if (course.batchList.includes(batchId)) {
                res.status(400).json({
                    message: "This Batch is already added to the list"
                })
            }
            course.batchList.push(batchId)
            await course.save();
            res.status(201).json({
                message: "new batch added successfully"
            })
        }

    } catch (error) {
        next(error)
    }
}