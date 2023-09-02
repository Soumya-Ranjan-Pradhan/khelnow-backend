import Team from "../model/Teams.js";

// Create a new team
const createTeams = async (req, res) => {
  try {
    const requiredFields = ["name", "logoUrl", "slug"];
  
    const missingFields = requiredFields.filter((field) => !req.body[field]);
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }
  
    const teamExists = await Team.exists({
      $or: [
        { name: req.body.name },
        { logoUrl: req.body.logoUrl },
        { slug: req.body.slug },
      ],
    });
  
    if (teamExists) {
      return res.status(400).json({
        error: "Team already exists",
      });
    }
  
    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();
  
    res.json(savedTeam);
  } catch (error) {
    console.error("Error creating a new team:", error);
    res.status(500).json({ error: "Could not create a new team" });
  }
  
};

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Teams.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch teams" });
  }
};

// Get a single team
const getTeams = async (req, res) => {
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
};

// Update a team
const updateTeams = async (req, res) => {
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
};

// Delete Teams
const deleteTeams = async (req, res) => {
  try {
    const deletedTeam = await Teams.findByIdAndRemove(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(deletedTeam);
  } catch (error) {
    res.status(500).json({ error: "Could not delete the team" });
  }
};

export { createTeams, getAllTeams, getTeams, updateTeams, deleteTeams };
