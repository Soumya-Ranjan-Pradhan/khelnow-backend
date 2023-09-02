import GoverningBodiesModel from "../model/GoverningBodies.js";

// Create a new governing body
const CreateGoverning = async (req, res) => {
  try {
    const requiredFields = ["name", "slug", "logoUrl", "sportsType"];
  
    // Validate that all required fields
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(" ")}`,
      });
    }
  
    // Check  already exists
    const existingGoverningBody = await GoverningBodiesModel.findOne({
      sportsType: req.body.sportsType,
    });
  
    if (existingGoverningBody) {
      return res.status(400).json({
        error: "Governing sportsType already exists",
      });
    }
  
    // Create and save a new governing body
    const newGoverningBody = new GoverningBodiesModel(req.body);
    const savedGoverning = await newGoverningBody.save();
  
    res.status(201).json(savedGoverning);
  } catch (error) {
    res.status(500).json({ error: error.message });
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