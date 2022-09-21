const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

// Register route
const registerRoute = async (req, res) => {
  // Password hashing
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const { firstName, lastName, email, city } = req.body;
  try {
    const result = await createUser(req);
    const {user_id, first_name, last_name} = result.rows[0];
    const token = jwt.sign({ id: user_id }, secret);
    return res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
        httpOnly: true,
        secure: false,
      })
      .status(201)
      .json({
        last_name: last_name,
        first_name: first_name,
      });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// Export
module.exports = { registerRoute };

function createUser(req) {
    return Postgres.query(
      "INSERT INTO users(last_name, first_name, email, city, password) VALUES ($1, $2, $3, $4, $5)  RETURNING user_id, first_name, last_name",
      [firstName, lastName, email, city, hashedPassword]
    )
}