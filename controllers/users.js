import userModel from "../model/Users.js";

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, userName } = req.body;
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "userName",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(422).json({
        error: `Please fill in the following fields properly: ${missingFields.join(
          ", "
        )}`,
      });
    }
   
    const existingUserByEmail = await userModel.findOne({ email });
    const existingUserByUserName = await userModel.findOne({ userName });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    if (existingUserByUserName) {
      return res
        .status(400)
        .json({ error: "User with this username already exists" });
    }

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      mobile,
      userName,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
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
