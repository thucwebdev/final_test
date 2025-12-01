const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  teacherPositions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeacherPosition'
  }],
  degrees: {
    type: Object,
    default: {}
  },
  degreesType: {
    type: String
  },
  degreesSchool: {
    type: String
  },
  degreesMajor: {
    type: String
  },
  degreesYear: {
    type: Number
  },
  degreesIsGraduated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Teacher', teacherSchema);