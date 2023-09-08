import Teams from "../model/Teams.js";

// Create a new team
const createTeams = async (req, res) => {
  const { name, sportsType, logoUrl, slug } = req.body;

  if (!name || !sportsType || !logoUrl || !slug) {
    return res
      .status(422)
      .json({ error: 'Please fill in all the fields properly' });
  }

  try {
    const teamExist = await Teams.findOne({
      name, sportsType, logoUrl, slug
    });

    if (teamExist) {
      return res.status(400).json({ error: 'Teams already exists' });
    }

    const newSport = new Teams({
      name, sportsType, logoUrl, slug
    });

    await newSport.save();

    res.status(201).json({ message: 'Teams created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create Teams' });
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
    const { name, sportsType, logoUrl,  slug } = req.body;
    const updatedTeam = await Teams.findByIdAndUpdate(
      req.params.id,
      { name, sportsType, logoUrl, slug },
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
