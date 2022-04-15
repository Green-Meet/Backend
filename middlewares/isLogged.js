const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
// Server code
const secret = process.env.SECRET;

const isLoggedIn = (req, res, next) => {
    try {
        req.data = jwt.verify(req.cookies.jwt, secret);
    } catch (err) {
        return res.status(401).json({
            message: "You are not logged in",
        });
    }
    next();
}

// Export
module.exports = isLoggedIn;