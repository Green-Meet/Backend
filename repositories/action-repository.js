const { Pool } = require("pg");
//const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const Postgres = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });

function UpdateActionToCancelStatus(req) {
    return Postgres.query("UPDATE actions SET status = 2 WHERE action_id=$1", [req.params.action_id]);
}

function getActionFromParticipants(req) {
  return Postgres.query(
    "SELECT * FROM participants WHERE user_id=$1 AND action_id=$2",
    [req.data.id, req.params.action_id]
  );
}

function selectAction(req) {
  return Postgres.query(
    "SELECT status FROM actions WHERE action_id = $1",
    [req.params.action_id]
  );
}

function updateActionToCancelStatus(req) {
  return Postgres.query("UPDATE actions SET status = 2 WHERE action_id=$1", [
    req.params.action_id,
  ]);
}

function updateAction(title, type, description, address, beginDate, endDate, beginTime, endTime, city, req) {
  return Postgres.query(
    "UPDATE actions SET title=$1, type=$2, description=$3, address=$4, begin_date=$5, end_date=$6, begin_time=$7, end_time=$8, city=$9 WHERE action_id=$10",
    [
      title,
      type,
      description,
      address,
      beginDate,
      endDate,
      beginTime,
      endTime,
      city.toLowerCase(),
      req.params.action_id,
    ]
  );
}

function selectActionByOrganiserId(req) {
  return Postgres.query(
    "SELECT * FROM actions WHERE organiser_id=$1",
    [req.params.organiser_id]
  );
}

function selectActionById(req) {
  return Postgres.query(
    "SELECT * FROM actions WHERE action_id=$1",
    [req.params.action_id]
  );
}

function queryBuilder(queryKeys, req) {
  let queryString = `SELECT * FROM actions WHERE ${queryKeys[0]}='${req.query[queryKeys[0]]
    .toString()
    .toLowerCase()}'`;
  for (i = 1; i < queryKeys.length; i++) {
    queryString += ` AND 
        ${queryKeys[i]} = '${req.query[queryKeys[i]]
        .toString()
        .toLowerCase()}'`;
  }
  return queryString;
}

function selectAllActions() {
  return Postgres.query("SELECT * FROM actions");
}

function insertNewAction(title, type, description, address, beginDate, endDate, beginTime, endTime, req, city) {
  Postgres.query(
    "INSERT INTO actions(title, type, description, address, begin_date, end_date, begin_time, end_time, organiser_id, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [
      title,
      type,
      description,
      address,
      beginDate,
      endDate,
      beginTime,
      endTime,
      req.data.id,
      city.toLowerCase(),
    ]
  );
}

module.exports = {
    UpdateActionToCancelStatus, 
    getActionFromParticipants, 
    selectAction, 
    insertNewAction, 
    selectAction, 
    selectAllActions, 
    selectActionById, 
    selectActionByOrganiserId,
    queryBuilder,
    updateAction,
    updateActionToCancelStatus
};