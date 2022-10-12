const router = require("express").Router();
const userController = require("../controllers/user.controller");

//get user data on refresh
router.get("/refresh", userController.getUserRefresh);

//user logout
router.get("/logout", userController.logout);

module.exports = router;
