const express = require("express");
const app = express();
const router = express.Router();


// Middleware 
const isLoggedIn = require("../middlewares/isLogged");
const { userPatchValidation } = require("../middlewares/validateReqData");

// Controllers
const { getUser, patchUser, userActions, deleteUser } = require("../controllers/accountControllers");

// get user data 
router.get("/:user_id", isLoggedIn, getUser);

// PATCH route to modify the data of a user
router.patch("/", isLoggedIn, userPatchValidation, patchUser);

// GET user's actions 
router.get("/actions", isLoggedIn, userActions);

// Delete user account 
router.delete("/", isLoggedIn, deleteUser);

// Exports
module.exports = router;