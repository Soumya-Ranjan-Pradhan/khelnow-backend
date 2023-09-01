const express = require("express");
const router = express.Router();
const team = require("../controllers/teams")

router.post("/",team.post);

router.get("/", team.get);

router.get("/:id",team.getAll);

router.put("/:id",team.updates);

router.delete("/:id",team.Delete);

module.exports = router;
