const Players = require("../model/Players");

// Create a new player
const post = async (req, res) => {
    try {
      const player = new Players(req.body);
      await player.save();
      res.status(201).json(player);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

// Get All player
const getAll = async (req, res) => {
    try {
      const players = await Players.find().populate("sportsType");
      res.json(players);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

 // Get a specific player
  const get =  async (req, res) => {
    try {
      const players = req.params.id.trim();
      const player = await Players.findById(players);
      if (!player) {
        return res.status(404).json({ error: "Player not found" });
      }
      res.json(player);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Update a player
  const updates = async (req, res) => {
    try {
      const player = await Players.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!player) {
        return res.status(404).json({ error: "Player not found" });
      }
      res.json(player);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Delete a player
  const deletes = async (req, res) => {
    try {
      const player = await Players.findByIdAndRemove(req.params.id);
      if (!player) {
        return res.status(404).json({ error: "Player not found" });
      }
      res.json({ message: "Player deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  module.exports = {get,getAll,deletes,updates,post}