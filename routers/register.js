const express = require("express");
const router = express.Router();

const userRepository = require("../repositories/user-repository");

// Middleware
const { regValidation } = require('../middlewares/validateReqData');

// Controller
const { RegisterService } = require("../controllers/register-service");

// Create user (signup)
router.post("/", regValidation, RegisterService(userRepository));

// Export route
module.exports = router;