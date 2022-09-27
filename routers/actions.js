const express = require("express");
const router = express.Router();

const actionRepository = require('../repositories/action-repository');

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
router.post("/", isLoggedIn, actionValidation, createAction(actionRepository));

// Get all actions or filter actions by request query params
router.get("/", filterActions(actionRepository));

// Get an action by organiser id
router.get("/organiser/:organiser_id", getActionByOrganiserId(actionRepository));

// Get an action by id
router.get("/:action_id", getActionById(actionRepository));

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
