const studentRepository = require("../repositories/studentRepository");

exports.createStudent = async (data) => {

    if (!data.name) {
        throw new Error("Student name is required");
    }

    return await studentRepository.createStudent(data);
};

exports.getStudents = async (page, limit, filters, sortBy, order) => {

    return await studentRepository.getStudents(
        page,
        limit,
        filters,
        sortBy,
        order
    );

};

exports.updateStudent = async (id, data) => {
    if (!id) {
        throw new Error("Student ID is required");
    }
    if (!data) {
        throw new Error("Student data is required");
    }
    return await studentRepository.updateStudent(id, data);
};

exports.deleteStudent = async (id) => {
    if (!id) {
        throw new Error("Student ID is required");
    }
    return await studentRepository.deleteStudent(id);
}