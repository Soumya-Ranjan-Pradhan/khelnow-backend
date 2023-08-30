const User = require("../model/Users");
const router = require("express").Router(); 

router.post("/users", async (req, resp) => {
  console.log(req.body + "api call");
  try {
    const newUser = new User(req.body);
    const saveUser = await newUser.save();
    resp.status(201).json(saveUser);
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
});

module.exports = router;
