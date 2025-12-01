const express = require('express');
const router = express.Router();
const { getTeacherPositions, createTeacherPosition } = require('../controller/teacherPositionController');

router.get('/', getTeacherPositions);
router.post('/', createTeacherPosition);

module.exports = router;