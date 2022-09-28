// Get a user's data
const getUser = (userRepository) => { 
  return async (req, res) => {
    try {
      const user = await userRepository.selectUserByData(req);
      if (user.rows.length === 0) {
        return res
          .status(400)
          .json({ message: `User with id ${req.data.id} not found` });
      }
      return res.status(200).json({ data: user.rows[0] });
    } catch (err) {
      return newError(res, err);
    }
  }
};

const getUserById = (userRepository) => { 
  return async (req, res) => {
    try {
      const user = await userRepository.selectUserById(req);
      if (user.rows.length === 0) {
        return res
          .status(400)
          .json({ message: `User with id ${req.params.user_id} not found` });
      }
      return res.status(200).json({ data: user.rows[0] });
    } catch (err) {
      return newError(res, err);
    }
  }
};

// Modify user data
const patchUser = (userRepository) => { 
  return async (req, res) => {
    const query = userRepository.queryBuilder(req);
    try {
      await Postgres.query(query, [req.data.id]);
    } catch (err) {
      return newError(res, req);
    }
    res.status(200).json({
      message: "User updated",
    });
  }
};

// Get a user's actions
const userActions = (userRepository) => { 
  return async (req, res) => {
    try {
      const actions = await userRepository.selectParticipantAction(req);
      return res.status(200).json({
        data: actions.rows,
      });
    } catch (err) {
      return newError(res, err);
    }
  }
};

// Delete a user's account
const deleteUser = (userRepository) => { 
  return async (req, res) => {
    try {
      await userRepository.updateUserToCancelStatus(req);
      res.clearCookie("jwt").redirect("/");
    } catch (err) {
      return newError(res, err);
    }
  }
};

module.exports = { getUser, getUserById, patchUser, userActions, deleteUser };

function newError(res, err) {
  return res.status(400).json({ message: err });
}

