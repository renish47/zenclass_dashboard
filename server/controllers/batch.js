const Batch = require("../models/batch")
const Student = require("../models/student")


exports.createBatch = async (req, res, next) => {
    const { batchName, type, language, staffs, coordinators } = req.body
    try {
        let batch = await Batch.findOne({ batchName });
        if (batch) {
            const error = new Error("Batch with this Name already exist")
            error.status = 403
            throw error
        }
        else {
            const newBatch = new Batch({
                batchName, type, language, staffs, coordinators
            })
            const data = await newBatch.save();
            res.status(201).json({
                message: "New Batch Created Successfully"
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.addStudent = async (req, res, next) => {
    try {
        const { studentId, batchId } = req.body
        const batch = await Batch.findById(batchId);
        if (!batch) {
            const error = new Error("Batch with this Id exist")
            error.status = 404
            throw error
        }
        const student = await Student.findById(studentId);
        if (!student) {
            const error = new Error("Student with this Id exist")
            error.status = 404
            throw error
        }

        if (student && student?.batchId?.toString() === batchId) {
            const error = new Error("Student with this Id Already added to this batch")
            error.status = 400
            throw error
        }
        batch.studentsList.push(studentId)
        student.batchId = batchId
        await batch.save()
        await student.save()
        res.status(200).json({
            message: "Student added to the batch Successfully"
        })
    } catch (error) {
        next(error)
    }
} 