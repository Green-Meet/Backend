const express = require("express");
const router = express.Router();

// Middleware 
const { loginValidation } = require("../middlewares/validateReqData");

// Controller
const { longinRoute } = require("../controllers/loginControllers");

router.post("/", loginValidation, longinRoute);

// Export route
module.exports = router;