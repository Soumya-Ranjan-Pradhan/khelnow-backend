import userModel from "../model/Users.js";

const registerUser = async (req, resp) => {
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
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !mobile ||
    !password ||
    !avatarUrl ||
    !userName ||
    !latestRefreshToken ||
    !role
  ) {
    return resp
      .status(422)
      .json({ error: "please fill in all the fields properly" });
  }

  try {
    const userExist = await userModel.findOne({
      firstName,
      lastName,
      email,
      mobile,
      password,
      avatarUrl,
      userName,
      latestRefreshToken,
      role,
    });

    if (userExist) {
      return resp.status(400).json({ error: "User already exists" });
    }

    const user = new userModel({
      firstName,
      lastName,
      email,
      mobile,
      password,
      avatarUrl,
      userName,
      latestRefreshToken,
      role,
    });

    await user.save();

    resp.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    resp.status(500).json({ err: "Failed to register" });
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
