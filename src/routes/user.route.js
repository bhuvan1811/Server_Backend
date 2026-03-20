const express = require("express");
const router = express.Router();

const {login, forgotPassword, resetPassword, usersList} = require('../controller/user.controller');
const {signup} = require('../auth/auth.controller');

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users", usersList);

module.exports = router;
