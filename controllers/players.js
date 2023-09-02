import PlayersModel from "../model/Players.js";

// Create a new player
const createPlayers = async (req, res) => {
  try {
    const requiredFields = [
      "name",
      // "sportsType",
      "logoUrl",
      "avatarUrl",
      "slug",
    ];

    const missingFields = [];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const existingUser = await PlayersModel.findOne({
      $or: [
        { name: req.body.name },
        { logoUrl: req.body.logoUrl },
        {slug: req.body.slug },
        {avatarUrl: req.body.avatarUrl },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "player already exits",
      });
    }
    const player = await new PlayersModel.save();
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All player
const getAllPlayers = async (req, res) => {
  try {
    const players = await PlayersModel.find().populate("sportsType");
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific player
const getPlayers = async (req, res) => {
  try {
    const playerId = req.params.id.trim();
    const player = await PlayersModel.findById(playerId);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a player
const updatePlayers = async (req, res) => {
  try {
    const player = await PlayersModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a player
const deletePlayers = async (req, res) => {
  try {
    const player = await PlayersModel.findByIdAndRemove(req.params.id);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createPlayers, getAllPlayers, getPlayers, updatePlayers, deletePlayers };
