const Joi = require("joi");

exports.createStudentSchema = Joi.object({
  //studentId: Joi.string().required(),
  name: Joi.string().min(3).required(),
  course: Joi.string().required(),
  age: Joi.number().min(18).required(),
  email: Joi.string().email().required()
});


exports.updateStudentSchema = Joi.object({
  name: Joi.string().min(3),
  course: Joi.string(),
  age: Joi.number().min(18),
  email: Joi.string().email()
});


exports.idSchema = Joi.object({
  id: Joi.string().required()
});

exports.paginationSchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1).max(100)
});