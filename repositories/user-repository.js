const { Pool } = require("pg");

const Postgres = new Pool(
        {
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
            ssl: { rejectUnauthorized: false }
        });

function createUser(data) {
    return Postgres.query(
      "INSERT INTO users(last_name, first_name, email, city, password) VALUES ($1, $2, $3, $4, $5)  RETURNING user_id, first_name, last_name",
      [firstName, lastName, email, city, hashedPassword]
    )
}

function selectUserByEmail(email) {
    return Postgres.query("SELECT * FROM users WHERE email=$1", [
        email,
    ]);
}

function findAll() {
    return Postgres.query("SELECT * FROM users");
}

function UpdateUserToNullAttributes(req) {
    return Postgres.query("UPDATE users SET first_name = null, last_name = null, email = null, city = null, password = null, is_deleted = true WHERE user_id=$1", [
      req.params.user_id
    ]);
}

function selectUserByData(req) {
  return Postgres.query("SELECT * FROM USERS WHERE user_id=$1", [
      req.data.id,
    ])
}

function selectUserFromId(req) {
  return Postgres.query("SELECT * FROM USERS WHERE user_id=$1", [
      parseInt(req.params.id),
    ])
}

function selectParticipantAction(req) {
  return Postgres.query(
      "SELECT * FROM actions INNER JOIN participants ON participants.action_id = actions.action_id WHERE participants.user_id = $1",
      [req.data.id]
    )
}

function updateUserToCancelStatus(req) {
  return Postgres.query(
      "UPDATE users SET first_name = null, last_name = null, email = null, city = null, password = null, is_deleted = true WHERE user_id=$1",
      [req.data.id]
    )
}

function queryBuilder(req) {
  let queryStart = "UPDATE users SET ";
  let queryEnd = " WHERE user_id = $1";
  let params = Object.keys(req.body);
  let sql =
    params.reduce((prev, curr, index) => {
      if (curr !== "is_admin" && curr !== "password") {
        return index === 0
          ? `${prev} ${curr} = '${req.body[curr]}'`
          : `${prev}, ${curr} = '${req.body[curr]}'`;
      }
    }, queryStart) + queryEnd;

  return sql;
}

module.exports = {
  createUser, 
  selectUserByEmail, 
  findAll, 
  UpdateUserToNullAttributes, 
  queryBuilder, 
  updateUserToCancelStatus, 
  selectUserByData, 
  selectUserFromId, 
  selectParticipantAction
};