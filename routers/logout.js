const express = require("express");
const router = express.Router();

// Route
router.get("/", (_req, res) => {
    res.clearCookie("jwt").redirect("/");
});

// Export route
module.exports = router;