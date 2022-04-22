const express = require("express");
const app = express();
const router = express.Router();

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
} = require("../controllers/accountControllers");

// get user data
router.get("/", isLoggedIn, getUser);

// GET user's actions
router.get("/actions", isLoggedIn, userActions);

// GET login
router.get("/isLogged", isLoggedIn);

// get user data by ID
router.get("/:id", isLoggedIn, getUserById);

// PATCH route to modify the data of a user
router.patch("/", isLoggedIn, userPatchValidation, patchUser);

// Delete user account
router.delete("/", isLoggedIn, deleteUser);

// Exports
module.exports = router;
