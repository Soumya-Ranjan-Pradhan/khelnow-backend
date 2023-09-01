const express = require("express");
const router = express.Router();
const UserProfile = require("../model/UserProfile");

// create a new user profile
router.post("/", async (req, res) => {
  try {
    const userProfile = await UserProfile.create(req.body);
    res.status(201).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user Profile
router.get("/:id", async (req, res) => {
  try {
    const userProfileId = req.params.id.trim(); 
    const userProfile = await UserProfile.findById(userProfileId);
        console.log(userProfile)
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error)
  }
});

//update userProfile
router.put("/:id", async (req, res) => {
    try {
      const userProfile = await UserProfile.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!userProfile) {
        return res.status(404).json({ error: "User profile not found" });
      }
      res.status(200).json(userProfile);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  //Delete The User
  router.delete("/:id", async (req, res) => {
    try {
      const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
      if (!userProfile) {
        return res.status(404).json({ error: "User profile not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  module.exports = router;