const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// Action creation (POST)
const createAction = async (req, res) => {
    const { title, type, description, address, date, time, city } = req.body;
    try {
        await Postgres.query("INSERT INTO actions(title, type, description, address, begin_date, end_date, begin_time, end_time, organiser_id, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [title, type, description, address, beginDate, endDate, beginTime, endTime, req.data.id, city.toLowerCase()]);
    } catch (err) {
        res.status(400).json({ message: err });
    }
    res.status(201).json({
        message: "Action created",
    });
};

// Get all actions or filter actions by request query params
const filterActions = async (req, res) => {
    const queryKeys = Object.keys(req.query);
    if (queryKeys.length === 0) {
        try {
            const actions = await Postgres.query("SELECT * FROM actions");
            return res.status(200).json({
                data: actions.rows,
            })
        } catch (err) {
            return res.status(400).json({
                message: err,
            });
        }
    }
    let queryString = `SELECT * FROM actions WHERE ${queryKeys[0]}='${req.query[queryKeys[0]].toString().toLowerCase()}'`;
    for (i = 1; i < queryKeys.length; i++) {
        queryString += ` AND 
        ${queryKeys[i]} = '${req.query[queryKeys[i]].toString().toLowerCase()}'`
    };
    console.log(queryString);
    try {
        const actions = await Postgres.query(queryString);
        return res.status(200).json({ data: actions.rows });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};

// Get an action by id
const getActionById = async (req, res) => {
    try {
        const action = await Postgres.query("SELECT * FROM actions WHERE action_id=$1", [req.params.action_id]);
        if (action.rows.length === 0) {
            return res.status(400).json({ message: `Action with id: ${req.params.action_id} not found` });
        }
        return res.status(200).json({ data: action.rows[0] });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};

// PATCH an action
const patchAction = async (req, res) => {
    let queryStart = "UPDATE actions SET ";
    let queryEnd = " WHERE action_id=$1";
    let params = Object.keys(req.body);
    let sql = params.reduce((prev, curr, index) => {
        return index === 0 ? `${prev} ${curr} = '${req.body[curr]}'` :
            `${prev}, ${curr} = '${req.body[curr]}'`;
    }, queryStart) + queryEnd;
    try {
        await Postgres.query(sql, [req.params.action_id]);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    res.status(200).json({ message: "Action updated" });
};

// Delete an action
const deleteAction = async (req, res) => {
    try {
        await Postgres.query("UPDATE actions SET status = 2 WHERE action_id=$1", [req.params.action_id]);
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    res.status(200).json({ message: "Action deleted" });
};

// Join an action
const joinAction = async (req, res) => {
    let action;
    try {
        action = await Postgres.query("SELECT status FROM actions WHERE action_id = $1", [req.params.action_id]);
        if (action.rows.length === 0) {
            return res.status(400).json({
                message: "Action not found",
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: err,
        });
    }
    // Check if an action is not terminated or cancelled (status is not 1 or 2)
    if (action.rows[0].status !== 0) {
        return res.status(400).json({
            message: "Action is either cancelled or completed",
        });
    }
    try {
        await Postgres.query("INSERT INTO participants (user_id, action_id) VALUES ($1, $2)", [
            req.data.id,
            req.params.action_id
        ]);
        return res.status(200).json({ message: "You joined the action" });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};

// Export
module.exports = { createAction, filterActions, getActionById, patchAction, deleteAction, joinAction };