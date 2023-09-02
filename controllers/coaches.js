import coachesModel from "../model/Coaches.js";

const createCoaches = async (req, res) => {
    try {
        const requiredFields = ["name", "slug", "avatarUrl","sportsType"];
      
        const missingFields = requiredFields.filter((field) => !req.body[field]);
      
        if (missingFields.length > 0) {
          return res.status(400).json({
            error: `Missing required fields: ${missingFields.join(" ")}`,
          });
        }
      
        const existingCoaches = await coachesModel.findOne({
          $or: [
            { name: req.body.name },
            { slug: req.body.slug },
            { avatarUrl: req.body.avatarUrl },
          ],
        });
      
        if (existingCoaches) {
          return res.status(400).json({
            error: "Coaches already exists",
          });
        }
      
        const newCoaches = new coachesModel(req.body);
        const savedCoaches= await newCoaches.save();
        res.status(201).json(savedCoaches);
      } catch (error) {
        console.error("Error creating a new coaches:", error);
        res.status(500).json({ error: "Could not create a new coaches" });
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
