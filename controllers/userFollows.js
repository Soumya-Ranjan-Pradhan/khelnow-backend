import UserFollowsModel from "../model/UsersFollows.js";

// User follow
const follow = async (req, res) => {
  try {
    // console.log(req.body)
    const { followingId } = req.body;

    const existingFollow = await UserFollowsModel.findOne({
      followingId,
    });
    // console.log(
    //   "🚀 ~ file: userFollows.js:12 ~ follow ~ existingFollow:",
    //   existingFollow
    // );

    const userId = req.user;
    console.log("🚀 ~ file: userFollows.js:18 ~ follow ~ userId:", userId);

    if (existingFollow) {
      return res.status(400).json({ message: "User not following this." });
    }

    const newFollow = new UserFollowsModel({ userId, followingId });
    console.log(
      "🚀 ~ file: userFollows.js:22 ~ follow ~ UserFollowsModel:",
      newFollow
    );
    await newFollow.save();
    console.log(
      "🚀 ~ file: userFollows.js:30 ~ follow ~ newFollowId:",
    );

    return res
      .status(201)
      .json({ message: "User following", });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// User unfollow
const unfollow = async (req, res) => {
  try {
    const {followingId } = req.body;

    const result = await UserFollowsModel.findOneAndDelete({
      followingId,
    });
    // console.log("🚀 ~ file: userFollows.js:44 ~ unfollow ~ result:", result);

    if (!result) {
      return res.status(400).json({ message: "User not following.",});
    }


    return res.status(200).json({ message: "Unfollowed the user." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export { follow, unfollow };
