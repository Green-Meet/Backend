const express = require("express");
const app = express();
const { Pool } = require("pg");

let environment = process.env.ENVIRONMENT;
if (!process.env.ENVIRONMENT) { environment = 'prod' };

const Postgres = new Pool(
        {
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
            ssl: environment === 'prod' ? { rejectUnauthorized: false } : null
        });


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
