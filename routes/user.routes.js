const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authRequest = require("../middleware/authRequest");
const rateLimiter = require("express-rate-limit");

//rate limiter
const rateLimit = rateLimiter({
  windowMs: 45000,
  max: 50,
  message: (req, res) => {
    console.log(req);
    res.status(429).json({
      message: `Too many requests. Please try again after ${parseInt(
        (new Date(req.rateLimit.resetTime).getTime() - new Date().getTime()) /
          1000
      )} second(s)`
    });
  },
  legacyHeaders: false
});

//get user data on refresh
router.get("/refresh", userController.getUserRefresh);

//user logout
router.get("/logout", userController.logout);

//delete user account
router.post("/delete", rateLimit, authRequest, userController.deleteAccount);

module.exports = router;
