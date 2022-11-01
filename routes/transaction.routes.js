const router = require("express").Router();
const transactionController = require("../controllers/transaction.controller");
const authRequest = require("../middleware/authRequest");

//auth middleware
router.use(authRequest);

//add balance router
router.post("/balance/add", transactionController.addBalance);

//add transaction router
router.post("/add", transactionController.addTransaction);

//get account overview
router.get("/overview", transactionController.getOverview);

module.exports = router;
