const User = require("../model/Users");

const post = async (req, resp) => {
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

    const missingFields = [];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return resp
        .status(400)
        .json({
          error: `Missing required fields:`,
        });
    }

    const existingUser = await User.findOne({
      $or: [
        { email: req.body.email },
        { userName: req.body.userName },
        { mobile: req.body.mobile },
      ],
    });

    if (existingUser) {
      return resp
        .status(400)
        .json({
          error:
            "User email, username, or phone number already exists",
        });
    }

    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    resp.status(201).json(savedUser);
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
}

////Read the users
const get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

//update the user
const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

//delete the user
const deletes = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {get,post,update,deletes}
