const express = require("express");
const router = express.Router();
const GoverningBodies = require("../model/GoverningBodies");

//Create a GovernigBodies
router.post("/", async (req, res) => {
  try {
    const governingBody = new GoverningBodies(req.body);
    await governingBody.save();
    res.status(201).json(governingBody);
  } catch (err) {
    console.error("Error creating governing body:", err);
    res.status(400).json({ error: "Failed to create governing body." });
  }
});


// Get all governing bodies
router.get("/", async (req, res) => {
  try {
    const governingBodies = await GoverningBodies.find();
    res.json(governingBodies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific governing
router.get("/:id", async (req, res) => {
  try {
    const governingBody = await GoverningBodies.findById(req.params.id);
    if (!governingBody) {
      return res.status(404).json({ error: "Governing body with the specified ID was not found." });
    }
    res.json(governingBody);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update a governing 
router.put("/:id", async (req, res) => {
  try {
    const governingBody = await GoverningBodies.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!governingBody) {
      return res.status(404).json({ error: "Governing body not found" });
    }
    res.json(governingBody);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a governing body by ID
router.delete("/:id", async (req, res) => {
    try {
      const governingBody = await GoverningBodies.findByIdAndRemove(req.params.id);
      if (!governingBody) {
        return res.status(404).json({ error: "Governing body not found" });
      }
      res.json({ message: "Governing body deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router