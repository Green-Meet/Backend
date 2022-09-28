const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

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
app.use("/api/login", login);
app.use("/api/logout", logout);
app.use("/api/register", register);
app.use("/api/actions", actions);
app.use("/api/account", account);
app.use("/api/admin", admin);
app.use("/api/contact", contact);

app.get("api/", (_req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send("<h1>Welcome</h1>");
});

// // Routes inexistantes
app.get("*", (_req, res) => {
  res.status(404).send("Error 404, this page does not exists");
});

module.exports = {app};
