import PlayersModel from "../model/Players.js";

// Create a new player
const createPlayers = async (req, res) => {
  const { name, slug, sportsType, avatarUrl } = req.body;

  if (!name || !slug || !sportsType || !avatarUrl) {
    return res
      .status(422)
      .json({ error: 'Please fill in all the fields properly' });
  }

  try {
    const playerExist = await PlayersModel.findOne({
      name, slug, sportsType, avatarUrl
    });

    if (playerExist) {
      return res.status(400).json({ error: 'Players already exists' });
    }

    const newPlayers = new PlayersModel({
      name, slug, sportsType, avatarUrl
    });

    await newPlayers.save();

    res.status(201).json({ message: 'Players created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create Players' });
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
