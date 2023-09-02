import UserProfileModel from "../model/UserProfile.js";

// Create a new user profile
const createProfile = async (req, res) => {
  try {
    const userProfile = await UserProfileModel.create(req.body);
    res.status(201).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user Profile
const getProfile = async (req, res) => {
  try {
    const userProfileId = req.params.id.trim();
    const userProfile = await UserProfileModel.findById(userProfileId);
    console.log(userProfile);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

// Update userProfile
const updateProfile = async (req, res) => {
  try {
    const userProfile = await UserProfileModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete The User
const deleteProfile = async (req, res) => {
  try {
    const userProfile = await UserProfileModel.findByIdAndDelete(req.params.id);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createProfile, getProfile, updateProfile, deleteProfile };
