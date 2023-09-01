const express = require("express");
const router = express.Router();
const userFollows = require("../controllers/userFollows");

router.post("/follow", userFollows.follow);

router.post("/unfollow", userFollows.unfollow);

module.exports = router;
