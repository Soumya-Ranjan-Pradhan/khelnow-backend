const express = require("express");
const router = express.Router();
const players = require("../controllers/players");

router.post("/", players.post);

router.get("/", players.getAll);

router.get("/:id", players.get);

router.put("/:id", players.updates);

router.delete("/:id", players.deletes);

module.exports = router;
