const Task = require("../models/task")
const Batch = require("../models/batch")
const Student = require("../models/student")

exports.createTask = async (req, res, next) => {
    const { taskName, question, dueDate, batchId } = req.body
    try {

        const batch = await Batch.findById(batchId)
        if (!batchId) {
            const error = new Error("batch with this id doesnt exist")
            error.status = 404
            throw error
        }
        const tasks = await Task.find({ batchId })
        let taskNo = 1;

        if (tasks.length) {
            taskNo = tasks[tasks.length - 1].taskNo + 1
        }
        const newTask = new Task({
            taskName, question, dueDate, batchId, taskNo
        })

        const data = await newTask.save();
        batch.studentsList.forEach(async (studentId) => {
            let student = await Student.findById(studentId)
            student.tasks.push({ taskId: data._id })
            await student.save()
        })

        res.status(201).json({
            message: "New Task Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

