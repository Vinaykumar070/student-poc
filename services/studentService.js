const studentRepository = require("../repositories/studentRepository");
const Student = require("../models/Student");


exports.createStudent = async (data) => {
  // 🔹 Get last student
  const lastStudent = await Student.findOne().sort({ createdAt: -1 });

  let newId = "S1";

  if (lastStudent && lastStudent.studentId) {
    const lastNumber = parseInt(lastStudent.studentId.substring(1));
    newId = "S" + (lastNumber + 1);
  }

  const student = new Student({
    studentId: newId,
    name: data.name,
    course: data.course,
    age: data.age,
    email: data.email
  });

  return await student.save();
};

// exports.getStudents = async (page, limit, filters, sortBy, order) => {

//     return await studentRepository.getStudents(
//         page,
//         limit,
//         filters,
//         sortBy,
//         order
//     );

// };
exports.getStudents = async (page, limit, filters, sortBy, order) => {
  const skip = (page - 1) * limit;

  const query = filters || {};

  const totalRecords = await Student.countDocuments(query);

  const students = await Student.find(query)
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit);

  return {
    totalRecords,
    currentPage: page,
    totalPages: Math.ceil(totalRecords / limit),
    data: students,
  };
};


// 🔹 Get ALL students (no limit)
exports.getAllStudents = async () => {
  return await Student.find().sort({ name: 1 });
};

// 🔹 Get filtered + paginated students
exports.getStudents = async (
  page,
  limit,
  filters,
  sortField,
  sortOrder
) => {
  const skip = (page - 1) * limit;

  const data = await Student.find(filters)
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(filters);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data
  };
};

exports.updateStudent = async (studentId, data) => {
    if (!studentId) {
        throw new Error("Student ID is required");
    }
    if (!data) {
        throw new Error("Student data is required");
    }
    return await studentRepository.updateStudentByStudentId(studentId, data);
};

exports.deleteStudent = async (studentId) => {
    if (!studentId) {
        throw new Error("Student ID is required");
    }
    return await studentRepository.deleteStudentByStudentId(studentId);
};