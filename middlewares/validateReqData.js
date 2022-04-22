const express = require("express");
const app = express();
const Joi = require("@hapi/joi");

// REGISTER SCHEMA
const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    city: Joi.string().required(),
});
// LOGIN SCHEMA
const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
});
// CREATE ACTION SCHEMA
const actionSchema = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    beginDate: Joi.date().required(),
    endDate: Joi.date().required(),
    beginTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
    endTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
    city: Joi.string().required(),
});
// UPDATE ACTION SCHEMA
const actionPatchSchema = Joi.object({
  title: Joi.string(),
  type: Joi.string(),
  description: Joi.string(),
  address: Joi.string(),
  beginDate: Joi.date(),
  endDate: Joi.date(),
  beginTime: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/),
  endTime: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/),
  city: Joi.string(),
});
// UPDATE USER SCHEMA
const userPatchSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  city: Joi.string(),
  address: Joi.string(),
});
// CONTACT SCHEMA 
const contactSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  text: Joi.string().required(),
});

// VALIDATION FUNCTIONS

// REGISTER VALIDATION FUNCTION
const regValidation = (req, res, next) => {
  const validationResult = registerSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error,
    });
  }
  next();
};
// LOGIN VALIDATION ACTION
const loginValidation = (req, res, next) => {
  const validationResult = loginSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error,
    });
  }
  next();
};
// CREATE ACTION VALIDATION FUNCTION
const actionValidation = (req, res, next) => {
  const validationResult = actionSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error,
    });
  }
  next();
};
// UPDATE ACTION VALIDATION FUNCTION
const actionPatchValidation = (req, res, next) => {
  const validationResult = actionPatchSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error,
    });
  }
  next();
};
// UPDATE USER VALIDATION FUNCTION
const userPatchValidation = (req, res, next) => {
  const validationResult = userPatchSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error,
    });
  }
  next();
};
// CONTACT VALIDATION FUNCTION 
const contactValidation = (req, res, next) => {
  const validationResult = contactSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error,
    });
  }
  next();
};

//Export
module.exports = {
  regValidation,
  loginValidation,
  actionValidation,
  actionPatchValidation,
  userPatchValidation,
  contactValidation
};
