const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/userController");
const { validateUser } = require("../utils/validations");


router.route("/register").post(validateUser, register);

router.route("/login").post( login);

router.route("/logout").get(logout);

module.exports = router;
