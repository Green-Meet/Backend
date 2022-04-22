const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

const contact = async (req, res) => {
  const {firstName, lastName, email, text} = req.body;
  try {
    await Postgres.query("INSERT INTO messages (first_name, last_name, email, text) VALUES ($1, $2, $3, $4)", [firstName, lastName, email, text]);
  } catch (err) {
    return res.status(400).json({message: err});
  }
  return res.status(200).json({message: "Message sent successfully"});
}

module.exports = contact;