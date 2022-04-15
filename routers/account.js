const express = require("express");
const app = express();
const router = express.Router();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// Middleware 
const isLoggedIn = require("../middlewares/isLogged");
const { userPatchValidation } = require("../middlewares/validateReqData");


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

// PATCH route to modify the data of a user
router.patch("/", isLoggedIn, userPatchValidation, async (req, res) => {
    let queryStart = "UPDATE users SET ";
    let queryEnd = " WHERE user_id = $1";
    let params = Object.keys(req.body);
    let sql = params.reduce((prev, curr, index) => {
        if (curr !== "is_admin" && curr !== "password") {
            return index === 0 ? `${prev} ${curr} = '${req.body[curr]}'` : `${prev}, ${curr} = '${req.body[curr]}'`
        }
    }, queryStart) + queryEnd;
    try {
        await Postgres.query(sql, [req.data.id]);
    } catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
    res.status(200).json({
        message: "User updated"
    })
});

// GET user's actions 
router.get("/actions", isLoggedIn, async (req, res) => {
    try {
        const actions = await Postgres.query("SELECT * FROM actions INNER JOIN participants ON participants.action_id = actions.action_id WHERE participants.user_id = $1", [req.data.id]);
        return res.status(200).json({
            data: actions.rows,
        })
    } catch (err) {
        return res.status(400).json({
            message: err,
        })
    }
});

// Delete user account 
router.delete("/", isLoggedIn, async (req, res) => {
    try {
        await Postgres.query("UPDATE users SET first_name = null, last_name = null, email = null, city = null, password = null, is_deleted = true WHERE user_id=$1", [req.data.id]);
        res.clearCookie("jwt").redirect("/");
    } catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
});

// Exports
module.exports = router;