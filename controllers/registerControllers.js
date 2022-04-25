const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// Register route
const registerRoute = async (req, res) => {
    // Password hashing
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const { firstName, lastName, email, city } = req.body;
    try {
        await Postgres.query(
            "INSERT INTO users(last_name, first_name, email, city, password) VALUES ($1, $2, $3, $4, $5)",
            [firstName, lastName, email, city, hashedPassword]
        );
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    res.status(201).json({ message: "User created" });
};

// Export
module.exports = { registerRoute };