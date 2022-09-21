const express = require("express");
const app = express();
const router = express.Router();

const userRepository = require("../repositories/user-repository");

// Middleware
const isLoggedIn = require("../middlewares/isLogged");
const { userPatchValidation } = require("../middlewares/validateReqData");

// Controllers
const {
  getUser,
  getUserById,
  patchUser,
  userActions,
  deleteUser,
} = require("../controllers/account-service");

// get user data
router.get("/", isLoggedIn, getUser(userRepository));

// GET user's actions
router.get("/actions", isLoggedIn, userActions(userRepository));

// GET login
router.get("/isLogged", isLoggedIn);

// get user data by ID
router.get("/:id", getUserById(userRepository));

// PATCH route to modify the data of a user
router.patch("/", isLoggedIn, userPatchValidation, patchUser(userRepository));

// Delete user account
router.delete("/", isLoggedIn, deleteUser(userRepository));

// Exports
module.exports = router;
