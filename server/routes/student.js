const express = require('express')
const router = express.Router()
const studentController = require('../controllers/student')


router.post("/create", studentController.createStudent)
router.post("/add-project", studentController.addProject)
router.get("/getInfo/:studentId", studentController.getStudentInfo)
router.put("/submit-task", studentController.submitTask)
router.put("/update-chapterList", studentController.updateChapterList)
router.put("/update-projectInfo", studentController.updateProjectInfo)

module.exports = router