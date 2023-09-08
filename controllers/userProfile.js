import UserProfileModel from "../model/UserProfile.js";

// Create a new user profile
const createProfile = async (req, res) => {
  const {
    userId,
    bio,
    job,
    address,
    city,
    country,  
    zipcode,
    language,
    notification,
    role,
    facebookUrl,
    instagramUrl,
    twitterUrl,
    location,
  } = req.body;

  if (
    !userId ||
    !bio ||
    !job ||
    !address ||
    !city ||
    !country ||
    !zipcode ||
    !language ||
    !notification ||
    !role ||
    !facebookUrl ||
    !instagramUrl ||
    !twitterUrl ||
    !location
  ) {
    return res
      .status(422)
      .json({ error: "Please fill in all the fields properly" });
  }

  try {
    // Create a new user profile object and save it
    const userProfile = new UserProfileModel({
      userId,
      bio,
      job,
      address,
      city,
      country,
      zipcode,
      language,
      notification,
      role,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      location,
    });

    if (userProfile) {
      return res.status(400).json({ error: "Profile already exists" });
    }

    await userProfile.save();

    res.status(201).json({ message: "Profile Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create profile" });
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
