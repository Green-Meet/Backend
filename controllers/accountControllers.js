const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// Get a user's data
const getUser = async (req, res) => {
  try {
    const user = await selectUserByData(req);
    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ message: `User with id ${req.data.id} not found` });
    }
    return res.status(200).json({ data: user.rows[0] });
  } catch (err) {
    return newError(res, err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await selectUserFromId(req);
    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ message: `User with id ${req.params.user_id} not found` });
    }
    return res.status(200).json({ data: user.rows[0] });
  } catch (err) {
    return newError(res, err);
  }
};

// Modify user data
const patchUser = async (req, res) => {
  const query = queryBuilder(req);
  try {
    await Postgres.query(query, [req.data.id]);
  } catch (err) {
    return newError(res, req);
  }
  res.status(200).json({
    message: "User updated",
  });
};

// Get a user's actions
const userActions = async (req, res) => {
  try {
    const actions = await selectParticipantAction(req);
    return res.status(200).json({
      data: actions.rows,
    });
  } catch (err) {
    return newError(res, err);
  }
};

// Delete a user's account
const deleteUser = async (req, res) => {
  try {
    await updateUserToCancelStatus(req);
    res.clearCookie("jwt").redirect("/");
  } catch (err) {
    return newError(res, err);
  }
};

module.exports = { getUser, getUserById, patchUser, userActions, deleteUser };



function selectUserByData(req) {
  return Postgres.query("SELECT * FROM USERS WHERE user_id=$1", [
      req.data.id,
    ])
}

function newError(res, err) {
  return res.status(400).json({ message: err });
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