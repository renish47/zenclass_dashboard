const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema(
    {
        batchId: {
            type: Schema.Types.ObjectId,
            ref: 'Batch'
        },
        taskName: {
            type: String,
            required: true
        },
        taskNo: {
            type: Number,
            required: true,
        },

        question: {
            type: String,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
    }, { timestamps: true }
)

module.exports = mongoose.model("Task", taskSchema);