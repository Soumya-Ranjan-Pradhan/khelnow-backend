const express = require("express");
const router = express.Router();
const Competition = require("../controllers/competitions");

router.post("/", Competition.post);

router.get("/", Competition.getAll);

router.get("/:id", Competition.get);

router.put("/:id", Competition.updates);

router.delete("/:id", Competition.deletes);

module.exports = router;
