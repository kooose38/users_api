const express = require("express");
const router = express.Router()
const controller = require("./controller")

router
   .route("/api/users")
   .get(controller.getUsers)


module.exports = router;