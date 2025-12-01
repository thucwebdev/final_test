const TeacherPosition = require('../model/TeacherPosition');
const getTeacherPositions = async (req, res) => {
  try {
    const positions = await TeacherPosition.find({ isDeleted: false })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: positions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

const createTeacherPosition = async (req, res) => {
  try {
    const { name, code, des } = req.body;

    const existingPosition = await TeacherPosition.findOne({ code, isDeleted: false });
    if (existingPosition) {
      return res.status(400).json({
        success: false,
        message: 'Mã vị trí công tác đã tồn tại'
      });
    }

    const newPosition = new TeacherPosition({
      name,
      code,
      des
    });

    const savedPosition = await newPosition.save();

    res.status(201).json({
      success: true,
      message: 'Tạo vị trí công tác thành công',
      data: savedPosition
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
  getTeacherPositions,
  createTeacherPosition
};