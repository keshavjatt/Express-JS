const express = require("express");
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.get("/user/get", authMiddleware, userController.getUser);


module.exports = router;
