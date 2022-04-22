const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// Get a user's data
const getUser = async (req, res) => {
  try {
    const user = await Postgres.query("SELECT * FROM USERS WHERE user_id=$1", [
      req.data.id,
    ]);
    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ message: `User with id ${req.data.id} not found` });
    }
    return res.status(200).json({ data: user.rows[0] });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const getUserById = async (req, res) => {
  try {
    console.log(req.params);
    const user = await Postgres.query("SELECT * FROM USERS WHERE user_id=$1", [
      parseInt(req.params.id),
    ]);
    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ message: `User with id ${req.params.user_id} not found` });
    }
    return res.status(200).json({ data: user.rows[0] });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// Modify user data
const patchUser = async (req, res) => {
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
  try {
    await Postgres.query(sql, [req.data.id]);
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
  res.status(200).json({
    message: "User updated",
  });
};

// Get a user's actions
const userActions = async (req, res) => {
  try {
    const actions = await Postgres.query(
      "SELECT * FROM actions INNER JOIN participants ON participants.action_id = actions.action_id WHERE participants.user_id = $1",
      [req.data.id]
    );
    return res.status(200).json({
      data: actions.rows,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

// Delete a user's account
const deleteUser = async (req, res) => {
  try {
    await Postgres.query(
      "UPDATE users SET first_name = null, last_name = null, email = null, city = null, password = null, is_deleted = true WHERE user_id=$1",
      [req.data.id]
    );
    res.clearCookie("jwt").redirect("/");
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

module.exports = { getUser, getUserById, patchUser, userActions, deleteUser };
