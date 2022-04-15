const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

// Login route
const longinRoute = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Postgres.query("SELECT * FROM users WHERE email=$1", [email]);
        if (user.rows === 0) {
            res.status(400).json({
                message: "Invalid email"
            });
        }
        const isPasswordValid = await bcrypt.compare(
            password,
            user.rows[0].password
        );
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }
        const token = jwt.sign({ id: user.rows[0].user_id }, secret);
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
            httpOnly: true,
            secure: false,
        });
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err
        });
    }
};

// Export
module.exports = { longinRoute };