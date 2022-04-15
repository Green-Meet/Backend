const express = require("express");
const app = express();
const router = express.Router();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// Middleware
const isAdmin = require("../middlewares/isAdmin");
const isLoggedIn = require("../middlewares/isLogged");

// GET list of users
router.get("/users", isLoggedIn, isAdmin, async (req, res) => {
    let users;
    try {
        users = await Postgres.query("SELECT * FROM users");
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    console.log(users.rows.length === 0);
    res.json({ data: users.rows });
});

// DELETE actions
router.delete("/action/:action_id", isLoggedIn, isAdmin, async (req, res) => {
    try {
        await Postgres.query("UPDATE actions SET status = 2 WHERE action_id=$1", [req.params.action_id]);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    res.status(200).json({ message: "Action deleted" });
});



// Export
module.exports = router;