const express = require("express");
const app = express();
const router = express.Router();

const userRepository = require("../repositories/user-repository");
const actionRepository = require ('../repositories/action-repository');

// Middleware
const isAdmin = require("../middlewares/isAdmin");
const isLoggedIn = require("../middlewares/isLogged");

// Controllers
const { getUsers, deleteActions, deleteUser } = require("../controllers/admin-service");

// GET list of users
router.get("/users", isLoggedIn, isAdmin, getUsers(userRepository));

// DELETE actions
router.delete("/action/:action_id", isLoggedIn, isAdmin, deleteActions(actionRepository));

// DELETE user
router.delete("/user/:user_id", isLoggedIn, isAdmin, deleteUser(userRepository));

// Export
module.exports = router;