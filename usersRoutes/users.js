const router = require("express").Router();
const user = require("../controllers/users")

router.post("/", user.post);
router.get("/:id", user.get);
router.put("/:id", user.update);
router.delete("/:id", user.deletes);

module.exports = router;
