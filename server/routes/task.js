const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')


router.post("/create", taskController.createTask)

module.exports = router