const Competitions = require("../model/Competitions");

//Create a new competition
const post = async (req, res) => {
    try {
      const competitionData = req.body; 
      const competition = new Competitions(competitionData);
      await competition.save();
      res.status(201).json(competition);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  //Read a Single Competitions
const getAll = async (req, res) => {
    try {
      const competitions = await Competitions.find();
      res.json(competitions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

//Read Id Competition
const get = async (req, res) => {
    try {
      const competitions = req.params.id.trim();
      const competition = await Competitions.findById(competitions);
      if (!competition) {
        return res.status(404).json({ error: "Competition not found" });
      }
      res.json(competition);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //updata competitions
  const updates = async (req, res) => {
    try {
      const competition = await Competitions.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!competition) {
        return res.status(404).json({ error: "Competition not found" });
      }
      res.json(competition);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //Delete competions

  const deletes = async (req, res) => {
    try {
      const competition = await Competitions.findByIdAndDelete(req.params.id);
      if (!competition) {
        return res.status(404).json({ error: "Competition not found" });
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  module.exports = {post, get, getAll, updates, deletes}