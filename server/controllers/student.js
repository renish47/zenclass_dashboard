const { populate } = require("dotenv")
const Student = require("../models/student")
const Lesson = require("../models/lesson")
const Course = require("../models/course")

exports.getStudentInfo = async (req, res, next) => {
    try {
        const { studentId } = req.params
        const studentData = await Student.findById(studentId).populate([{ path: "courseId", select: "courseName duration syllabusLink", populate: { path: "lessonList", select: "moduleNo lessonName chapters" } }, { path: "batchId", select: "batchName type language staffs coordinators" }, { path: "tasks", populate: { path: "taskId", select: "taskName dueDate question taskNo" }, select: "taskId submittedOn grade" }])
        if (!studentData) {
            const error = new Error("Student with this id doesn't exist")
            error.status = 404
            throw error
        }
        res.status(200).json({ studentData })
    } catch (error) {
        next(error)
    }
}

exports.createStudent = async (req, res, next) => {
    const { firstName, lastName, regNo, courseId } = req.body
    try {
        let student = await Student.findOne({ regNo });
        if (student) {
            const error = new Error("Student with this regNo already exist")
            error.status = 403
            throw error
        }
        let course = await Course.findById(courseId).populate("lessonList");
        if (student) {
            const error = new Error("Student with this regNo already exist")
            error.status = 403
            throw error
        }

        const lessonsProgress
            = course.lessonList.map(lesson => {
                return {
                    lessonId: lesson._id,
                    chaptersCompleted: []
                }
            })
        const newStudent = new Student({
            firstName, lastName, regNo, courseId, lessonsProgress
        })
        const data = await newStudent.save();
        res.status(201).json({
            message: "Student Created Successfully",
            data
        })
    } catch (error) {
        next(error)
    }
}

exports.addProject = async (req, res, next) => {
    try {
        const { projectName, description, imageUrl, deployedLink, githubLink, studentId } = req.body
        let student = await Student.findById(studentId);
        if (!student) {
            const error = new Error("Student doesn't exist")
            error.status = 404
            throw error
        }
        let projectNo = 1;
        const projects = student.projects
        if (projects.length) {
            projectNo = projects[projects.length - 1].projectNo + 1
        }
        student.projects.push({ projectNo, projectName, description, imageUrl, deployedLink, githubLink })
        await student.save()
        res.status(200).json({
            message: "Project Added Successfully"
        })

    } catch (error) {
        next(error)
    }
}

exports.submitTask = async (req, res, next) => {
    try {
        const { studentId, taskId, answerLink } = req.body
        const studentData = await Student.findById(studentId)
        if (!studentId) {
            const error = new Error("Student with this ID doesn't exist")
            error.status = 404
            throw error
        }
        for (let i = 0; i < studentData.tasks.length; i++) {
            if (studentData.tasks[i].taskId.toString() === taskId) {
                studentData.tasks[i].answerLink = answerLink,
                    studentData.tasks[i].submittedOn = new Date()
                break;
            } else if (i === studentData.tasks.length - 1) {
                const error = new Error("Task with this ID doesn't exist")
                error.status = 404
                throw error
            }
        }
        await studentData.save()
        res.status(200).json({ message: "Task submitted successfully" })
    } catch (error) {
        next(error)
    }
}

exports.updateChapterList = async (req, res, next) => {
    try {

        const { lessonId, chapterName, studentId } = req.body
        const studentData = await Student.findById(studentId)
        const lessonData = await Lesson.findById(lessonId)
        if (!studentId) {
            const error = new Error("Student with this ID doesn't exist")
            error.status = 404
            throw error
        }
        let chapNo = null;
        let isChapterInLesson = lessonData.chapters.map((chapter, i) => {
            if (chapter.chapterName === chapterName) {
                chapNo = i + 1
                return chapter
            }
        })
        if (!isChapterInLesson.length) {
            const error = new Error("requested chapter isnt in the lesson database")
            error.status = 404
            throw error
        }
        const lessonProgress = studentData.lessonsProgress

        for (let i = 0; i < lessonProgress.length; i++) {
            if (lessonProgress[i].lessonId.toString() === lessonId) {
                const temp = lessonProgress[i].chaptersCompleted.filter(chapter => chapter.chapterName === chapterName)
                if (temp.length) {
                    lessonProgress[i].chaptersCompleted.splice(i, i + 1)
                    lessonProgress[i].progress = Math.round((lessonProgress[i].chaptersCompleted.length / lessonData.chapters.length) * 100)
                } else {
                    lessonProgress[i].chaptersCompleted.push({ chapterName, chapterNo: chapNo })
                    lessonProgress[i].progress = Math.round((lessonProgress[i].chaptersCompleted.length / lessonData.chapters.length) * 100)
                }
                break;
            } else if (i === lessonProgress.length - 1) {
                lessonProgress.push({
                    lessonId,
                    progress: Math.round((1 / lessonData.chapters.length) * 100),
                    chaptersCompleted: [{ chapterName, chapterNo: chapNo }]
                })
            }

        }
        await studentData.save()
        res.status(200).json({ message: "chapterList updated successfully" })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.updateProjectInfo = async (req, res, next) => {
    try {
        const { projectInfo, projectId, studentId } = req.body
        const studentData = await Student.findById(studentId)
        if (!studentId) {
            const error = new Error("Student with this ID doesn't exist")
            error.status = 404
            throw error
        }
        studentData.projects =
            studentData.projects.map((project) => {
                if (project._id.toString() === projectId) {
                    return { ...project, ...projectInfo }
                }
                else {
                    return project
                }
            });
        studentData.save()
        res.status(201).json({
            message: "Project info updated Successfully",
            projects: studentData.projects
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}