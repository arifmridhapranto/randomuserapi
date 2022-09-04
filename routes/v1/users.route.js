const express = require("express");
const usersController = require("../../controllers/users.controller")
const router = express.Router();


router.route("/all").get(usersController.getAllUsers);
router.route("/random").get(usersController.getRandomUser);
router.route("/save").post(usersController.saveUser);


module.exports = router;
