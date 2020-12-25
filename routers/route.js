const express = require("express");
const router = express.Router()
const controller = require("./controller")

router
   .route("/api/users")
   .get(controller.getUsers)

router
   .route("/api/users/:id")
   .get(controller.getUser)

router
   .route("/api/search")
   .get(controller.serchUser)


module.exports = router;