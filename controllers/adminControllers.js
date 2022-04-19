const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// GET list of users
const getUsers = async (req, res) => {
    let users;
    try {
        users = await Postgres.query("SELECT * FROM users");
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    console.log(users.rows.length === 0);
    res.json({ data: users.rows });
};

// DELETE actions
const deleteActions = async (req, res) => {
    try {
        await Postgres.query("UPDATE actions SET status = 2 WHERE action_id=$1", [req.params.action_id]);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    res.status(200).json({ message: "Action deleted" });
};

// DELETE user
const deleteUser = async (req, res) => {
    try {
        await Postgres.query("UPDATE users SET first_name = null, last_name = null, email = null, city = null, password = null, is_deleted = true WHERE user_id=$1", [req.params.user_id]);
        return res.status(200).json({
            message: "User deleted",
        })
    } catch (err) {
        return res.status(400).json({
            message: err,
        })
    }
};

// Export
module.exports = { getUsers, deleteActions, deleteUser };