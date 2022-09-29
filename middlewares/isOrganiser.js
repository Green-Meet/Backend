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


const isOrganiser = async (req, res, next) => {
    try {
        const action = await getOrganiser(req);
        if (action.rows[0].organiser_id !== req.data.id) {
            return res.status(401).json({ message: "Only organiser can modify/delete action" });
        }
    } catch (err) {
        return res.status(400).json({ message: err });
    }
    next();
};

module.exports = isOrganiser;

function getOrganiser(req) {
    return Postgres.query("SELECT (organiser_id) FROM actions WHERE action_id = $1", [req.params.action_id]);
}
