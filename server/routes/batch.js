const express = require('express')
const router = express.Router()
const batchController = require('../controllers/batch')


router.post("/create", batchController.createBatch)
router.put("/add-student", batchController.addStudent)

module.exports = router