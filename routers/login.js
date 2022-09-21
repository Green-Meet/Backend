const express = require("express");
const router = express.Router();

const userRepository = require('../repositories/user-repository');

// Middleware 
const { loginValidation } = require("../middlewares/validateReqData");

// Controller
const { LoginService } = require("../controllers/login-service");

router.post("/", loginValidation, LoginService(userRepository));

// Export route
module.exports = router;