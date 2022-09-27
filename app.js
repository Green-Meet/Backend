const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const { Client } = require("pg")

// Cors
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Dotenv
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

// PostGres
const { Pool } = require("pg");
// const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

const connectDb = async () => {
    try {
        const pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
            //ssl: { rejectUnauthorized: true }
        });
 
        await pool.connect()
        const res = await pool.query('SELECT * FROM actions')
        console.log(res.rows)
        await pool.end()
    } catch (error) {
        console.log(error)
    }
}
 
connectDb()

// Middlewares
app.use(cookieParser());
app.use(express.json());

// ********** ROUTES ********* //

// Routers import
const login = require("./routers/login");
const logout = require("./routers/logout");
const register = require("./routers/register");
const actions = require("./routers/actions");
const account = require("./routers/account");
const admin = require("./routers/admin");
const contact = require("./routers/contact");

// API routes
app.use("/login", login);
app.use("/logout", logout);
app.use("/register", register);
app.use("/actions", actions);
app.use("/account", account);
app.use("/admin", admin);
app.use("/contact", contact);

app.get("/", (_req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send("<h1>Welcome</h1>");
});

// // Routes inexistantes
app.get("*", (_req, res) => {
  res.status(404).send("Error 404, this page does not exists");
});

module.exports = {app};
