const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        regNo: {
            type: String,
            required: true,
            unique: true
        },
        batchId: {
            type: Schema.Types.ObjectId,
            ref: 'Batch',

        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        attendance: {
            totalNoOfClasses: {
                type: Number,
                default: 0
            }
            ,
            noOfClassesAttended: {
                type: Number,
                default: 0
            }
        },
        tasks: [
            {
                taskId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Task'
                },
                answerLink: {
                    type: String,
                    default: ""

                },
                grade: {
                    type: String,
                    default: ""
                },
                submittedOn: {
                    type: Date,
                }

            }
        ],
        projects: [
            {
                projectNo: {
                    type: Number,
                    required: true,
                },
                projectName: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                imageUrl: {
                    type: String,
                    required: true
                },
                deployedLink: {
                    type: String,
                    required: true
                },
                githubLink: {
                    type: String,
                    required: true
                },
                submittedOn: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        lessonsProgress: [
            {
                lessonId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Lesson'
                },
                chaptersCompleted: [
                    {
                        chapterName: String,
                        chapterNo: Number
                    }
                ],
                progress: {
                    type: Number,
                    default: 0,
                    min: 0,
                    max: 100
                }
            }
        ]
    }
)

module.exports = mongoose.model("Student", studentSchema);