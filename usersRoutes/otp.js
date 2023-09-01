const otp = require("../controllers/otp")
const router = require("express").Router();

router.post("/", otp);

module.exports = router;
