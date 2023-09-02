import UserProfileModel from "../model/UserProfile.js";

// Create a new user profile
const createProfile = async (req, res) => {
  try {
    const requiredFields = [
      "bio",
      "job",
      "address",
      "city",
      "country",
      "zipcode",
      "language",
      "notification",
      "facebookUrl",
      "instagramUrl",
      "twitterUrl",
      "location",
    ];

    const missingFields = [];
    
    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const existingUser = await UserProfileModel.findOne({
      $or: [
        { bio: req.body.bio },
        { job: req.body.job },
        { address: req.body.address },
        { city: req.body.city },
        { country: req.body.country },
        { zipcode: req.body.zipcode },
        { notification: req.body.notification },
        { facebookUrl: req.body.facebookUrl },
        { instagramUrl: req.body.instagramUrl },
        { twitterUrl: req.body.twitterUrl },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "bio, job, address, city , country, zipcode, notification, facebookUrl, instagramUrl,twitterUrl, already exists",
      });
    }

    const userProfile = await UserProfileModel.save();
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
