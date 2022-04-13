const express = require("express");
const app = express();
const router = express.Router();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// Middleware 
const isLoggedIn = require("../middlewares/isLogged");

// get user data 
router.get("/:user_id", isLoggedIn, async (req, res) => {
    try {
        const user = await Postgres.query("SELECT * FROM USERS WHERE user_id=$1", [req.params.user_id]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: `User with id ${req.params.user_id} not found` });
        }
        return res.status(200).json({ data: user.rows[0] });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
});

// Exports
module.exports = router;