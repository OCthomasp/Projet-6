const express = require("express");
const router = express.Router();

const validation = require("../middleware/password-validation");

const userController = require("../controllers/user");

// route to sign up
router.post("/signup", validation, userController.signup);

// route to login
router.post("/login", userController.login);

module.exports = router;