import GoverningBodiesModel from "../model/GoverningBodies.js";

// Create a new governing body
const CreateGoverning = async (req, res) => {
  const { name, slug, sportsType, logoUrl } = req.body;

  if (!name || !slug || !sportsType || !logoUrl) {
    return res
      .status(422)
      .json({ error: 'Please fill in all the fields properly' });
  }

  try {
    const governingExist = await GoverningBodiesModel.findOne({
      name, slug, sportsType, logoUrl
    });

    if (governingExist) {
      return res.status(400).json({ error: 'governing already exists' });
    }

    const governing = new GoverningBodiesModel({
      name, slug, sportsType, logoUrl
    });

    await governing.save();

    res.status(201).json({ message: 'governing created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create governing' });
  }
};

// Read all governing bodies
const getAllGoverning = async (req, res) => {
  try {
    const governingBodies = await GoverningBodiesModel.find();
    res.json(governingBodies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  // Read a governing body by ID
const getGoverning = async (req, res) => {
    try {
      const governingBody = await GoverningBodiesModel.findById(req.params.id);
      if (!governingBody) {
        return res.status(404).json({ error: 'Governing body not found' });
      }
      res.json(governingBody);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

// Update a governing
const updateGoverning =  async (req, res) => {
    try {
      const updatedGoverningBody = await GoverningBodiesModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedGoverningBody) {
        return res.status(404).json({ error: 'Governing body not found' });
      }
      res.json(updatedGoverningBody);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

//Delete Governig

const deleteGovernig =  async (req, res) => {
    try {
      const deletedGoverningBody = await GoverningBodiesModel.findByIdAndDelete(req.params.id);
      if (!deletedGoverningBody) {
        return res.status(404).json({ error: 'Governing body not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export { CreateGoverning , getAllGoverning, getGoverning, updateGoverning, deleteGovernig };