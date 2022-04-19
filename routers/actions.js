const express = require("express");
const router = express.Router();

// Middlewares
const isLoggedIn = require("../middlewares/isLogged");
const isOrganiser = require("../middlewares/isOrganiser");
const { actionValidation, actionPatchValidation } = require("../middlewares/validateReqData");

// Controllers
const { createAction, filterActions, getActionById, patchAction, deleteAction, joinAction } = require("../controllers/actionsControllers");

// Action creation (POST)
router.post("/", isLoggedIn, actionValidation, createAction);

// Get all actions or filter actions by request query params
router.get("/", filterActions);

// Get an action by id
router.get("/:action_id", getActionById);

// PATCH an action
router.patch("/:action_id", isLoggedIn, isOrganiser, actionPatchValidation, patchAction);

// Delete action (set status to 2)
router.delete("/:action_id", isLoggedIn, isOrganiser, deleteAction);

// Join action (insert row into participants)
router.post("/:action_id/join", isLoggedIn, joinAction);

// Export route
module.exports = router;