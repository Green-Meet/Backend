const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// Middlewares
const isLoggedIn = require("../middlewares/isLogged");

// Action creation (POST)
router.post("/", isLoggedIn, async (req, res) => {
    const { title, type, description, address, date, time } = req.body;
    try {
        await Postgres.query("INSERT INTO actions(title, type, description, address, date, time, organiser_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [title, type, description, address, date, time, req.data.id]);
    } catch (err) {
        res.status(400).json({ message: err });
    }
    res.status(201).json({
        message: "Action created",
    });
});

// Export route
module.exports = router;