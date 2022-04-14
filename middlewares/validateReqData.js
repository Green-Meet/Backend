const express = require("express");
const app = express();
const Joi = require("Joi");

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
});
const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
});
const actionSchema = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})-([0-9]{2})\:([0-9]{2})$/).required(),
    city: Joi.string().required(),
});

const regValidation = (req, res, next) => {
    const validationResult = registerSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error,
        });
    }
    next();
};
const loginValidation = (req, res, next) => {
    const validationResult = loginSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error,
        });
    }
    next();
};
const actionValidation = (req, res, next) => {
    const validationResult = actionSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error,
        });
    }
    next();
};


//Export
module.exports = { regValidation, loginValidation, actionValidation };