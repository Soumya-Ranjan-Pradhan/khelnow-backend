const Teams = require("../model/Teams");
const express = require("express");
const router = express.Router();
const Sports = require("../model/Sports")

// Create a new team
// Create a new team
router.post("/", async (req, res) => {
    try {
      const { name, sportsType, logoUrl, kheltagId, slug } = req.body;
  
      const sports = await Sports.findById(sportsType);
      if (!sports) {
        return res.status(404).json({ error: "Sports type not found" });
      }
  
      const team = new Teams({ name, sportsType, logoUrl, kheltagId, slug });
      const savedTeam = await team.save();
      res.json(savedTeam);
    } catch (error) {
      console.error("Error creating a new team:", error);
      res.status(500).json({ error: "Could not create a new team" });
    }
  });
  

// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Teams.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch teams" });
  }
});

// Get a single team by ID
router.get("/:id", async (req, res) => {
  try {
    const userTeam = req.params.id.trim();
    const team = await Teams.findById(userTeam);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch the team" });
  }
});

// Update a team
router.put("/:id", async (req, res) => {
  try {
    const { name, sportsType, logoUrl, kheltagId, slug } = req.body;
    const updatedTeam = await Teams.findByIdAndUpdate(
      req.params.id,
      { name, sportsType, logoUrl, kheltagId, slug },
      { new: true }
    );
    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(updatedTeam);
  } catch (error) {
    res.status(500).json({ error: "Could not update the team" });
  }
});

//Delete Teams
router.delete("/:id", async (req, res) => {
  try {
    const deletedTeam = await Teams.findByIdAndRemove(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(deletedTeam);
  } catch (error) {
    res.status(500).json({ error: "Could not delete the team" });
  }
});

module.exports = router;