const Teacher = require('../model/Teacher');
const User = require('../model/User');
const TeacherPosition = require('../model/TeacherPosition');
const getTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (page - 1) * limit;
    const teachers = await Teacher.find({})
      .populate({
        path: 'userId',
        select: 'name email phoneNumber address'
      })
      .populate({
        path: 'teacherPositions',
        select: 'name code des'
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Teacher.countDocuments({});
    
    const teachersWithFullInfo = teachers.map(teacher => {
      const user = teacher.userId;
      return {
        _id: teacher._id,
        code: teacher.code,
        name: user ? user.name : '',
        email: user ? user.email : '',
        phoneNumber: user ? user.phoneNumber : '',
        address: user ? user.address : '',
        isActive: teacher.isActive,
        teacherPositions: teacher.teacherPositions,
        degrees: {
          degreesType: teacher.degreesType,
          degreesSchool: teacher.degreesSchool,
          degreesMajor: teacher.degreesMajor,
          degreesYear: teacher.degreesYear,
          degreesIsGraduated: teacher.degreesIsGraduated
        },
        startDate: teacher.startDate,
        endDate: teacher.endDate
      };
    });
    
    res.status(200).json({
      success: true,
      data: teachersWithFullInfo,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      identity,
      dob,
      startDate,
      endDate,
      teacherPositions,
      degreesType,
      degreesSchool,
      degreesMajor,
      degreesYear,
      degreesIsGraduated
    } = req.body;

    const existingUser = await User.findOne({ email, isDeleted: false });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email đã tồn tại'
      });
    }

    let code;
    let isCodeExists = true;
    
    while (isCodeExists) {
      code = Math.floor(100000 + Math.random() * 900000).toString();
      const existingTeacher = await Teacher.findOne({ code });
      if (!existingTeacher) {
        isCodeExists = false;
      }
    }

    const newUser = new User({
      name,
      email,
      phoneNumber,
      address,
      identity,
      dob: new Date(dob),
      role: 'TEACHER'
    });

    const savedUser = await newUser.save();

    const newTeacher = new Teacher({
      userId: savedUser._id,
      code,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      teacherPositions: teacherPositions || [],
      degreesType,
      degreesSchool,
      degreesMajor,
      degreesYear,
      degreesIsGraduated: degreesIsGraduated || false
    });

    const savedTeacher = await newTeacher.save();

    const populatedTeacher = await Teacher.findById(savedTeacher._id)
      .populate('userId', 'name email phoneNumber address')
      .populate('teacherPositions', 'name code des');

    res.status(201).json({
      success: true,
      message: 'Tạo giáo viên thành công',
      data: populatedTeacher
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

module.exports = {
  getTeachers,
  createTeacher
};