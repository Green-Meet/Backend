const express = require("express");
const router = express.Router();

const actionRepository = require('../repositories/action-repository');
const { Pool } = require("pg");

const database = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
            //ssl: { rejectUnauthorized: false }
        });

// Middlewares
const isLoggedIn = require("../middlewares/isLogged");
const isOrganiser = require("../middlewares/isOrganiser");
const {
  actionValidation,
  actionPatchValidation,
} = require("../middlewares/validateReqData");

// Controllers
const {
  createAction,
  filterActions,
  getActionById,
  getActionByOrganiserId,
  patchAction,
  deleteAction,
  joinAction,
} = require("../controllers/actions-service");

// Action creation (POST)
router.post("/", isLoggedIn, actionValidation, createAction(actionRepository, database));

// Get all actions or filter actions by request query params
router.get("/", filterActions(actionRepository, database));

// Get an action by organiser id
router.get("/organiser/:organiser_id", getActionByOrganiserId(actionRepository, database));

// Get an action by id
router.get("/:action_id", getActionById(actionRepository, database));

// PATCH an action
router.patch(
  "/:action_id",
  isLoggedIn,
  isOrganiser,
  actionPatchValidation,
  patchAction(actionRepository)
);

// Delete action (set status to 2)
router.delete("/:action_id", isLoggedIn, isOrganiser, deleteAction(actionRepository));

// Join action (insert row into participants)
router.post("/:action_id/join", isLoggedIn, joinAction(actionRepository));

// Export route
module.exports = router;
