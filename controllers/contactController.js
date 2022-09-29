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


const contact = async (req, res) => {
  const {firstName, lastName, email, text} = req.body;
  try {
    await sendMessage(firstName, lastName, email, text);
  } catch (err) {
    return res.status(400).json({message: err});
  }
  return res.status(201).json({message: "Message sent successfully"});
}

module.exports = {contact};

function sendMessage(firstName, lastName, email, text) {
  return Postgres.query("INSERT INTO messages (first_name, last_name, email, text) VALUES ($1, $2, $3, $4)", [firstName, lastName, email, text]);
}
