const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course')


router.post("/create", courseController.createCourse)
router.post("/add-batch", courseController.addBatchToCourse)

module.exports = router