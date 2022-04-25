const express = require("express");
const router = express.Router();
// const joi = require("Joi");

// Middleware
const { regValidation } = require('../middlewares/validateReqData');

// Controller
const { registerRoute } = require("../controllers/registerControllers");

// Create user (signup)
router.post("/", regValidation, registerRoute);

// Export route
module.exports = router;