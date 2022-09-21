const express = require("express");
const app = express();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

const isAdmin = async (req, res, next) => {
    try {
        const admin = await getAdminUser(req);
        if (!admin.rows[0].is_admin) {
            return res.status(401).json({
                message: "Only the admin is allowed to do this",
            });
        }
    } catch (err) {
        return res.status(401).json({
            message: err,
        });
    }
    next();
};

module.exports = isAdmin;

function getAdminUser(req) {
    return Postgres.query("SELECT is_admin FROM users WHERE user_id = $1", [req.data.id]);
}
