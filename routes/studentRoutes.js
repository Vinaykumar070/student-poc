const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const auth = require("../middleware/authMiddleware");


router.post("/", auth, studentController.createStudent);
router.get("/", auth, studentController.getStudents);

router.post("/", studentController.createStudent);
router.get("/", studentController.getStudents);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;