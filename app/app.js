const express = require("express");
const app = express();
const routers = require("../routers/route")
//静的ファイル
const path = require("path");
app.use(express.static(path.join(__dirname, "../public")))

//body-Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", routers)

module.exports = app;