const express = require("express");
const router = express.Router();
const userProfile = require("../controllers/userProfile")

router.post("/", userProfile.post);

router.get("/:id", userProfile.get);

router.put("/:id", userProfile.put);

router.delete("/:id", userProfile.deletes);

module.exports = router;
