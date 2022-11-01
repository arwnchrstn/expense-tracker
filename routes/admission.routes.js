const router = require("express").Router();
const admissionController = require("../controllers/admission.controller");

//account registration route
router.post("/register", admissionController.register);

//account login route
router.post("/login", admissionController.login);

module.exports = router;
