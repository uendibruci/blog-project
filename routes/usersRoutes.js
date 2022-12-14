"use-strict";

const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);

router.route("/").get(userController.getAllUsers);

router.route("/:id").get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
