const express = require("express");
const router = express.Router();

const {signup, login, forgotPassword, resetPassword, usersList} = require('../controller/user.controller');

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users", usersList);

module.exports = router;
