# API Documentation

## Base URL
```
http://localhost:3001/api
```

## 1. GET /teachers
Lấy danh sách toàn bộ thông tin giáo viên với phân trang

### Query Parameters:
- `page` (optional): Trang muốn lấy thông tin (default: 1)
- `limit` (optional): Giới hạn số lượng thông tin trên một trang (default: 10)

### Example:
```
GET http://localhost:3001/api/teachers?page=1&limit=10
```

### Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "code": "123456",
      "name": "Nguyễn Văn A",
      "email": "teacher@example.com",
      "phoneNumber": "0123456789",
      "address": "Hà Nội",
      "isActive": true,
      "teacherPositions": [...],
      "degrees": {
        "degreesType": "Thạc sĩ",
        "degreesSchool": "Đại học ABC",
        "degreesMajor": "Công nghệ thông tin",
        "degreesYear": 2020,
        "degreesIsGraduated": true
      },
      "startDate": "2023-01-01T00:00:00.000Z",
      "endDate": null
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1,
    "limit": 10
  }
}
```

## 2. POST /teachers
Tạo thông tin của 1 giáo viên mới

### Request Body:
```json
{
  "name": "Nguyễn Văn A",
  "email": "teacher@example.com",
  "phoneNumber": "0123456789",
  "address": "Hà Nội",
  "identity": "123456789012",
  "dob": "1990-01-01",
  "startDate": "2023-01-01",
  "endDate": null,
  "teacherPositions": ["position_id_1", "position_id_2"],
  "degreesType": "Thạc sĩ",
  "degreesSchool": "Đại học ABC",
  "degreesMajor": "Công nghệ thông tin",
  "degreesYear": 2020,
  "degreesIsGraduated": true
}
```

### Response:
```json
{
  "success": true,
  "message": "Tạo giáo viên thành công",
  "data": {
    "_id": "...",
    "userId": "...",
    "code": "123456",
    "startDate": "2023-01-01T00:00:00.000Z",
    "teacherPositions": [...]
  }
}
```

## 3. GET /teacher-positions
Lấy danh sách toàn bộ thông tin của các vị trí công tác

### Example:
```
GET http://localhost:3001/api/teacher-positions
```

### Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Giảng viên",
      "code": "GV001",
      "des": "Vị trí giảng viên chính",
      "isActive": true,
      "isDeleted": false,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

## 4. POST /teacher-positions
Tạo mới thông tin vị trí công tác

### Request Body:
```json
{
  "name": "Giảng viên",
  "code": "GV001",
  "des": "Vị trí giảng viên chính"
}
```

### Response:
```json
{
  "success": true,
  "message": "Tạo vị trí công tác thành công",
  "data": {
    "_id": "...",
    "name": "Giảng viên",
    "code": "GV001",
    "des": "Vị trí giảng viên chính",
    "isActive": true,
    "isDeleted": false,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

## Lưu ý:
- Mã giáo viên (code) sẽ được tự động sinh ra chuỗi số ngẫu nhiên 6 chữ số và không được phép trùng
- Email phải là duy nhất trong hệ thống
- Mã vị trí công tác (code) phải là duy nhất
- Tất cả API đều trả về JSON format với cấu trúc: `{success: boolean, message?: string, data?: any}`