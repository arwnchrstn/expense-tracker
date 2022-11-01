const router = require("express").Router();
const refreshController = require("../controllers/refresh.controller");

//refresh route for creating
router.get("/", refreshController);

module.exports = router;
