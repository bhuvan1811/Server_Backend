require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./src/routes/user.route")

app.use(express.json());

app.use("/admin", router);

module.exports = app;
