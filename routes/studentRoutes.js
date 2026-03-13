const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const {
  createStudentSchema,
  updateStudentSchema,
  idSchema,
} = require("../validators/studentValidator");

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get students list
 *     description: Returns paginated list of students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 5
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         example: Amar
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         example: amar@gmail.com
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         example: 29
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         example: name
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         example: asc
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/", auth, studentController.getStudents);
/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: S101
 *               name:
 *                 type: string
 *                 example: Amar
 *               course:
 *                 type: string
 *                 example: Computer Science
 *               age:
 *                 type: integer
 *                 example: 25
 *               email:
 *                 type: string
 *                 example: amar@gmail.com
 *     responses:
 *       201:
 *         description: Student created
 */
router.post(
  "/",
  auth,
  validate(createStudentSchema),
  studentController.createStudent,
);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               course:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated
 */
router.put(
  "/:id",
  auth,
  validate(idSchema, "params"),
  validate(updateStudentSchema),
  studentController.updateStudent,
);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete student
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted
 */
router.delete(
  "/:id",
  auth,
  validate(idSchema, "params"),
  studentController.deleteStudent,
);

module.exports = router;
