import userModel from "../model/Users.js";

const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      password,
      avatarUrl,
      userName,
      latestRefreshToken,
      role,
      deviceIds,
    } = req.body;

    // Validate that all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !password ||
      !avatarUrl ||
      !userName ||
      !latestRefreshToken ||
      !role ||
      !deviceIds
    ) {
      return res
        .status(422)
        .json({ error: "Please fill in all the fields properly" });
    }

    // Check if a user with the same email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Create a new user instance
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      mobile,
      password,
      avatarUrl,
      userName,
      latestRefreshToken,
      role,
      deviceIds,
    });
    
    await newUser.save();
 
    const token = await newUser.generateAuthToken();
    console.log(token)
    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Read the user
const getuserByid = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update the user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updatedUserData,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete the user
const deleteuser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getuserByid, registerUser, deleteuser, updateUser };
