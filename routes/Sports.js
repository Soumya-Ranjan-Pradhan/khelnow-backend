const express = require("express");
const router = express.Router();
const Sport = require("../controllers/sports");

router.post("/sports", Sport.post);

router.get("/", Sport.get);

router.get("/sports/:id", Sport.getID);

router.put("/sports/:id", Sport.updates);

router.delete("/sports/:id", Sport.Delete);

module.exports = router;
