const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

router.get('/', async (req, res) => {
    let users;
    try {
        users = await Postgres.query("SELECT * FROM users");
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    res.json({ data: users.rows });
});

// Export route
module.exports = router;