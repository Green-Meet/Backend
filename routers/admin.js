const express = require("express");
const app = express();
const router = express.Router();

// Middleware
const isAdmin = require("../middlewares/isAdmin");
const isLoggedIn = require("../middlewares/isLogged");

// Controllers
const { getUsers, deleteActions, deleteUser } = require("../controllers/adminControllers");

// GET list of users
router.get("/users", isLoggedIn, isAdmin, getUsers);

// DELETE actions
router.delete("/action/:action_id", isLoggedIn, isAdmin, deleteActions);

// DELETE user
router.delete("/user/:user_id", isLoggedIn, isAdmin, deleteUser);

// Export
module.exports = router;