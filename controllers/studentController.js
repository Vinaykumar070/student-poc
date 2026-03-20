const studentService = require("../services/studentService");
const {
  createStudentSchema,
  updateStudentSchema,
  idSchema,
  paginationSchema,
} = require("../validators/studentValidator");

exports.createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

// exports.getStudents = async (req, res, next) => {
//   try {
//     const pageParam = req.query.page;
//     const limitParam = req.query.limit;

//     // Validation
//     if (pageParam && isNaN(pageParam)) {
//       return res.status(400).json({ message: "Invalid page number" });
//     }

//     if (limitParam && isNaN(limitParam)) {
//       return res.status(400).json({ message: "Invalid limit value" });
//     }

//     // Default pagination
//     const page = parseInt(pageParam) || 1;
//     const limit = parseInt(limitParam) || 5;

//     // Dynamic filters (ONLY if present)
//     const filters = {};

//     if (req.query.name) {
//       filters.name = { $regex: req.query.name, $options: "i" }; // case-insensitive search
//     }

//     if (req.query.email) {
//       filters.email = { $regex: req.query.email, $options: "i" };
//     }

//     if (req.query.age) {
//       filters.age = parseInt(req.query.age);
//     }

//     // Sorting
//     const sortBy = req.query.sortBy || "name";
//     const order = req.query.order === "desc" ? -1 : 1;

//     // Call service
//     const result = await studentService.getStudents(
//       page,
//       limit,
//       filters,
//       sortBy,
//       order
//     );

//     res.json(result);

//   } catch (error) {
//     next(error); // centralized error handler
//   }
// };

exports.getStudents = async (req, res, next) => {
  try {
    const {
      page,
      limit,
      name,
      email,
      age,
      sortBy,
      order
    } = req.query;

    // =====================================================
    // ✅ Check if any VALID query param exists (ignore empty)
    // =====================================================
    const hasQuery = Object.values(req.query).some(
      (val) => val !== undefined && val !== ""
    );

    // =====================================================
    // 🔹 CASE 1: No query → return ALL students
    // =====================================================
    if (!hasQuery) {
      const students = await studentService.getAllStudents();

      return res.json({
        type: "ALL",
        count: students.length,
        data: students
      });
    }

    // =====================================================
    // 🔹 CASE 2: With query → validation + filtering
    // =====================================================

    // Validation
    if (page && isNaN(page)) {
      return res.status(400).json({ message: "Invalid page number" });
    }

    if (limit && isNaN(limit)) {
      return res.status(400).json({ message: "Invalid limit value" });
    }

    const pageNum = parseInt(page) || 1;

    // ✅ Safety limit
    const MAX_LIMIT = 100;
    const limitNum = Math.min(parseInt(limit) || 5, MAX_LIMIT);

    // =====================================================
    // Filters
    // =====================================================
    const filters = {};

    if (name) {
      filters.name = { $regex: name, $options: "i" };
    }

    if (email) {
      filters.email = { $regex: email, $options: "i" };
    }

    if (age) {
      filters.age = parseInt(age);
    }

    // =====================================================
    // Sorting
    // =====================================================
    const sortField = sortBy || "name";
    const sortOrder = order === "desc" ? -1 : 1;

    // =====================================================
    // Service call
    // =====================================================
    const result = await studentService.getStudents(
      pageNum,
      limitNum,
      filters,
      sortField,
      sortOrder
    );

    return res.json({
      type: "FILTERED",
      ...result
    });

  } catch (error) {
    next(error);
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
