const Sports = require("../model/Sports");

const post = async (req, res) => {
  try {
    const { name, kheltagId, slug } = req.body;
    const sport = new Sports({ name, kheltagId, slug });
    const savedSport = await sport.save();
    res.json(savedSport);
  } catch (error) {
    res.status(500).json({ error: "Could not create a new sport" });
  }
};

//Get All Sports
const get = async (req, res) => {
  try {
    const sports = await Sports.find();
    res.json(sports);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch sports" });
  }
};

// Get ID sport
const getID = async (req, res) => {
  try {
    const userSport = req.params.id.trim();
    const sport = await Sports.findById(userSport);
    if (!sport) {
      return res.status(404).json({ error: "Sport not found" });
    }
    res.json(sport);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch the sport" });
  }
};

//update sports

const updates = async (req, res) => {
  try {
    const { name, kheltagId, slug } = req.body;
    const updatedSport = await Sports.findByIdAndUpdate(
      req.params.id,
      { name, kheltagId, slug },
      { new: true }
    );
    if (!updatedSport) {
      return res.status(404).json({ error: "Sport not found" });
    }
    res.json(updatedSport);
  } catch (error) {
    res.status(500).json({ error: "Could not update the sport" });
  }
};

//Delete Sport
const Delete = async (req, res) => {
  try {
    const deletedSport = await Sports.findByIdAndRemove(req.params.id);
    if (!deletedSport) {
      return res.status(404).json({ error: "Sport not found" });
    }
    res.json(deletedSport);
  } catch (error) {
    res.status(500).json({ error: "Could not delete the sport" });
  }
};

module.exports = { post, get, getID, updates, Delete };
