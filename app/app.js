const express = require("express");
const app = express();
const routers = require("../routers/route")

//body-Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", routers)

module.exports = app;