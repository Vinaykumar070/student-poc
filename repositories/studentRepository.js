const Student = require("../models/Student");

exports.createStudent = async (data) => {
    return await Student.create(data);
};

exports.getStudents = async (page, limit, filters, sortBy, order) => {

    const skip = (page - 1) * limit;

    const query = {};

    if (filters.name) {
        query.name = { $regex: filters.name, $options: "i" };
    }

    if (filters.email) {
        query.email = { $regex: filters.email, $options: "i" };
    }

    if (filters.age) {
        query.age = filters.age;
    }

    const students = await Student
        .find(query)
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit);

    const total = await Student.countDocuments(query);

    return {
        totalRecords: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: students
    };
};

// Example (MongoDB / Mongoose style)
exports.updateStudentByStudentId = async (studentId, data) => {
    return await Student.findOneAndUpdate(
        { studentId: studentId },
        data,
        { new: true }
    );
};

exports.deleteStudentByStudentId = async (studentId) => {
    return await Student.findOneAndDelete({ studentId: studentId });
};