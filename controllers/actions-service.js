const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// Action creation (POST)
const createAction = (actionRepository) => { 
  return async (req, res) => {
    const {
      title,
      type,
      description,
      address,
      beginDate,
      endDate,
      beginTime,
      endTime,
      city,
    } = req.body;
    try {
      await actionRepository.insertNewAction(title, type, description, address, beginDate, endDate, beginTime, endTime, req, city);
    } catch (err) {
      return newError(res, err);
    }
    return res.status(201).json({
      message: "Action created",
    });
  }
};

// Get all actions or filter actions by request query params
const filterActions = (actionRepository) => { 
  return async (req, res) => {
    const queryKeys = Object.keys(req.query);
    if (queryKeys.length === 0) {
      try {
        const actions = await actionRepository.selectAllActions();
        return res.status(200).json({
          data: actions.rows,
        });
      } catch (err) {
        return newError(res, err);
      }
    }

    const queryString = actionRepository.queryBuilder(queryKeys, req);

    try {
      const actions = await Postgres.query(queryString);
      return res.status(200).json({ data: actions.rows });
    } catch (err) {
      return newError(res, err);
    }
  }
};

// Get an action by id
const getActionById = (actionRepository) => { 
  return async (req, res) => {
    try {
      const action = await actionRepository.selectActionById(req);
      if (action.rows.length === 0) {
        return res
          .status(400)
          .json({ message: `Action with id: ${req.params.action_id} not found` });
      }
      return res.status(200).json({ data: action.rows[0] });
    } catch (err) {
      return newError(res, err);
    }
  }
};

// Get an action by id
const getActionByOrganiserId = (actionRepository) => { 
  return async (req, res) => {
    try {
      const action = await actionRepository.selectActionByOrganiserId(req);
      if (action.rows.length === 0) {
        return res.status(400).json({
          message: `Action with id: ${req.params.organiser_id} not found`,
        });
      }
      console.log(action.rows);
      return res.status(200).json({ data: action.rows });
    } catch (err) {
      return newError(res, err);
    }
  }
};

// PATCH an action
const patchAction = (actionRepository) => { 
  return async (req, res) => {
    const {
      title,
      type,
      description,
      address,
      beginDate,
      endDate,
      beginTime,
      endTime,
      city,
    } = req.body;

    try {
      await actionRepository.updateAction(title, type, description, address, beginDate, endDate, beginTime, endTime, city, req);
    } catch (err) {
      return newError(res, err);
    }
    res.status(200).json({ message: "Action updated" });
  }
};

// Delete an action
const deleteAction = (actionRepository) => { 
  return async (req, res) => {
    try {
      await actionRepository.updateActionToCancelStatus(req);
    } catch (err) {
      return newError(res, err);
    }
    res.status(200).json({ message: "Action deleted" });
  }
};

// Join an action
const joinAction = (actionRepository) => { 
  return async (req, res) => {
    let action;
    try {
      action = await actionRepository.selectAction(req);
      if (action.rows.length === 0) {
        return res.status(400).json({
          message: "Action not found",
        });
      }
    } catch (err) {
      return newError(res, err);
    }
    // Check if an action is not terminated or cancelled (status is not 1 or 2)
    if (action.rows[0].status !== 0) {
      return res.status(400).json({
        message: "Action is either cancelled or completed",
      });
    }
    // Check if user did not already join the action
    try {
      const actions = await actionRepository.getActionFromParticipants(req);
      if (actions.rows.length !== 0) {
        return res.status(400).json({ message: "You already joined action!" });
      }
    } catch (err) {
      return newError(res, err);
    }

    try {
      await insertParticipant(req);
      return res.status(200).json({ message: "You joined the action" });
    } catch (err) {
      return newError(res, err);
    }
  }
};

// Export
module.exports = {
  createAction,
  filterActions,
  getActionById,
  getActionByOrganiserId,
  patchAction,
  deleteAction,
  joinAction,
};

function newError(res, err) {
  return res.status(400).json({ message: err });
}

function insertParticipant(req) {
  return Postgres.query(
    "INSERT INTO participants (user_id, action_id) VALUES ($1, $2)",
    [req.data.id, req.params.action_id]
  );
}



