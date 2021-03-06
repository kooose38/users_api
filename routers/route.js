const express = require("express");
const router = express.Router()
const controller = require("./controller")

router
   .route("/api/users")
   .get(controller.getUsers)
   .post(controller.createUser)

router
   .route("/api/users/:id")
   .get(controller.getUser)
   .put(controller.updatedUser)
   .delete(controller.removeUser)

router
   .route("/api/search")
   .get(controller.serchUser)

router
   .route("/api/following/:id")
   .get(controller.getFollowing)


router
   .route("/api/followed/:id")
   .get(controller.getFollowed)


module.exports = router;