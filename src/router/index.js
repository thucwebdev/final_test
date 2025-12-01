const express = require('express');
const router = express.Router();
const teacherRouter = require('./teacherRouter');
const teacherPositionRouter = require('./teacherPositionRouter');

router.use('/teachers', teacherRouter);
router.use('/teacher-positions', teacherPositionRouter);

module.exports = router;