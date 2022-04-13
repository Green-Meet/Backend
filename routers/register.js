const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const app = express();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

app.use(express.json());

// Create user (signup)
router.post("/", async (req, res) => {
    // Password hashing
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    try {
        await Postgres.query(
            "INSERT INTO users(last_name, first_name, email, city, password) VALUES ($1, $2, $3, $4, $5)",
            [req.body.firstName, req.body.lastName, req.body.email, req.body.city, hashedPassword]
        );
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    res.status(201).json({ message: "User created" });
});

// Export route
module.exports = router;