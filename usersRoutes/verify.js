const express = require("express");
const router = express.Router();
const Verify = require("../controllers/Verify")

router.post("/verify-otp", Verify);
module.exports = router;
