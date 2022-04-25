const express = require("express");
const router = express.Router();

// Controller 
const {contact} = require("../controllers/contactController"); 
// Middlewares 
const { contactValidation } = require("../middlewares/validateReqData"); 

// POST message from Contact form
router.post("/", contactValidation, contact);

module.exports = router;
