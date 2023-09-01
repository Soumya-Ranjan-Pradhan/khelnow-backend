const UserFollows = require("../model/UsersFollows");

//user follow
const follow = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const existingFollow = await UserFollows.findOne({
      followerId,
      followingId,
    });

    if (existingFollow) {
      return res.status(400).json({ message: "User not following this." });
    }

    const newFollow = new UserFollows({ followerId, followingId });
    await newFollow.save();

    return res.status(201).json({ message: "User following" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

//User unfollow
const unfollow = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const result = await UserFollows.findOneAndDelete({
      followerId,
      followingId,
    });

    if (!result) {
      return res.status(400).json({ message: "User not following." });
    }

    return res.status(200).json({ message: "unfollowed the user." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { follow, unfollow };
