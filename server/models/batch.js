const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchSchema = Schema(
    {
        batchName: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        studentsList: [{
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }]
        ,
        staffs: [{
            name: String,
            subject: String,
            email: String

        }],
        coordinators: [{
            name: String,
            desc: String,
            email: String

        }]
    }
)

module.exports = mongoose.model("Batch", batchSchema);