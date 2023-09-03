import coachesModel from "../model/Coaches.js";

const createCoaches = async (req, res) => {
  const { name, slug, sportsType, avatarUrl } = req.body;

  if (!name || !slug || !sportsType || !avatarUrl) {
    return res
      .status(422)
      .json({ error: 'Please fill in all the fields properly' });
  }

  try {
    const coachesExist = await coachesModel.findOne({
      name, slug, sportsType, avatarUrl
    });

    if (coachesExist) {
      return res.status(400).json({ error: 'coaches already exists' });
    }

    const newCoaches = new coachesModel({
      name, slug, sportsType, avatarUrl
    });

    await newCoaches.save();

    res.status(201).json({ message: 'coaches created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create coaches' });
  }
      
};

//  Create a new coach
const getNewCoaches = async (req, res) => {
  try {
    const coaches = await coachesModel.find();
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//  Get all coaches
const getAllCoaches = async (req, res) => {
  try {
    const coach = await coachesModel.findById(req.params.id);
    if (!coach) {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.json(coach);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Update Coaches
const updateCoaches = async (req, res) => {
  try {
    const coach = await coachesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!coach) {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.json(coach);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Delete Coaches
const deleteCoaches = async (req, res) => {
  try {
    const coach = await coachesModel.findByIdAndDelete(req.params.id);
    if (!coach) {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.json({ message: "Coach deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  createCoaches,
  getNewCoaches,
  getAllCoaches,
  updateCoaches,
  deleteCoaches,
};
