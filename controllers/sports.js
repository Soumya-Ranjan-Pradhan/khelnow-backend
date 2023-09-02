import Sports from "../model/Sports.js";

const createSport = async (req, res) => {
  try {
    const { name, kheltagId, slug } = req.body;
    const sport = new Sports({ name, kheltagId, slug });
    const savedSport = await sport.save();
    res.json(savedSport);
  } catch (error) {
    res.status(500).json({ error: "Could not create a new sport" });
  }
};

// Get All Sports
const getSports = async (req, res) => {
  try {
    const sports = await Sports.find();
    res.json(sports);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch sports" });
  }
};

// Get Sport by ID
const getSportID = async (req, res) => {
  try {
    const sportId = req.params.id.trim();
    const sport = await Sports.findById(sportId);
    if (!sport) {
      return res.status(404).json({ error: "Sport not found" });
    }
    res.json(sport);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch the sport" });
  }
};

// Update Sport
const updateSports = async (req, res) => {
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

// Delete Sport
const deleteSports = async (req, res) => {
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

export { createSport,getSports, getSportID, updateSports, deleteSports };
