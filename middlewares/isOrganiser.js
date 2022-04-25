const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

const isOrganiser = async (req, res, next) => {
    try {
        const action = await Postgres.query("SELECT (organiser_id) FROM actions WHERE action_id = $1", [req.params.action_id]);
        if (action.rows[0].organiser_id !== req.data.id) {
            return res.status(401).json({ message: "Only organiser can modify/delete action" });
        }
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    next();
};

module.exports = isOrganiser;