import CompetitionsModel from "../model/Competitions.js";

// Create a new competition
const createCompetitions = async (req, res) => {
  const { name, slug, sportsType, logoUrl } = req.body;

  if (!name || !slug || !sportsType || !logoUrl) {
    return res
      .status(422)
      .json({ error: 'Please fill in all the fields properly' });
  }

  try {
    const competitionExist = await CompetitionsModel.findOne({
      name, slug, sportsType, logoUrl
    });

    if (competitionExist) {
      return res.status(400).json({ error: 'competition already exists' });
    }

    const competition = new CompetitionsModel({
      name, slug, sportsType, logoUrl
    });

    await competition.save();

    res.status(201).json({ message: 'competition created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create competition' });
  }
};

// Read all competitions
const getAllCompetitions = async (req, res) => {
  try {
    const competitions = await CompetitionsModel.find();
    res.json(competitions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read a competition by ID
const getCompetitions = async (req, res) => {
  try {
    const competitionId = req.params.id.trim();
    const competition = await CompetitionsModel.findById(competitionId);
    if (!competition) {
      return res.status(404).json({ error: "Competition not found" });
    }
    res.json(competition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a competition
const updateCompetitions = async (req, res) => {
  try {
    const competition = await CompetitionsModel.findByIdAndUpdate(
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
};

// Delete a competition
const deleteCompetitions = async (req, res) => {
  try {
    const competition = await CompetitionsModel.findByIdAndDelete(
      req.params.id
    );
    if (!competition) {
      return res.status(404).json({ error: "Competition not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createCompetitions,
  getAllCompetitions,
  getCompetitions,
  updateCompetitions,
  deleteCompetitions,
};
