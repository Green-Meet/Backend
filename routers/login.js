const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

router.post("/login", async (req, res) => {
    try {

    } catch (err) {

    }
})

// Export route
module.exports = router;