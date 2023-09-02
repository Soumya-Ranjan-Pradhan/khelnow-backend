import userModel from "../model/Users.js";

const registerUser = async (req, resp) => {
  try {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "password",
      "avatarUrl",
      "userName",
      "latestRefreshToken",
      "role",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return resp.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const existingUser = await userModel.findOne({
      $or: [
        { email: req.body.email },
        { userName: req.body.userName },
        { mobile: req.body.mobile },
      ],
    });

    if (existingUser) {
      return resp.status(400).json({
        error: "User already exists",
      });
    }

    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();

    resp.status(201).json(savedUser);
  } catch (error) {
    resp.status(400).json({ error: error.message });
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
