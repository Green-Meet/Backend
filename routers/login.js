const express = require("express");
const router = express.Router();

// Middleware 
const { loginValidation } = require("../middlewares/validateReqData");

// Controller
const { login } = require("../controllers/loginControllers");

router.post("/", loginValidation, login);

// Export route
module.exports = router;