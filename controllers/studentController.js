const studentService = require("../services/studentService");
const {
  createStudentSchema,
  updateStudentSchema,
  idSchema,
  paginationSchema,
} = require("../validators/studentValidator");

exports.createStudent = async (req, res, next) => {
  const student = await studentService.createStudent(req.body);

  res.status(201).json(student);
};

exports.getStudents = async (req, res, next) => {
  try {
    const pageParam = req.query.page;
    const limitParam = req.query.limit;

    if (pageParam && isNaN(pageParam)) {
      throw new Error("Invalid page number");
    }

    if (limitParam && isNaN(limitParam)) {
      throw new Error("Invalid limit value");
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const filters = {
      name: req.query.name,
      email: req.query.email,
      age: req.query.age,
    };

    const sortBy = req.query.sortBy || "name";
    const order = req.query.order === "desc" ? -1 : 1;

    const result = await studentService.getStudents(
      page,
      limit,
      filters,
      sortBy,
      order,
    );

    res.json(result);
  } catch (error) {
    next(error); // sends error to centralized handler
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await studentService.deleteStudent(req.params.id);

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
