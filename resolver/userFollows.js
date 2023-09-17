import UserFollowsModel from "../model/UsersFollows.js";
import { UserInputError } from "apollo-server-express";

const userFollows = {
  Mutation: {
    followUser: async (_, { followerId, followingId }) => {
      try {
        const existingFollow = await UserFollowsModel.findOne({
          followerId,
          followingId,
        });
        if (existingFollow) {
          throw new UserInputError("User is already following this user.");
        }

        const newFollow = new UserFollowsModel({
          followerId,
          followingId,
        });
        const savedFollow = await newFollow.save();
        return savedFollow;
      } catch (error) {
        throw new UserInputError(error.message || "Failed to follow user.");
      }
    },

    unfollowUser: async (_, { followerId, followingId }) => {
      try {
        const deleteFollow = await UserFollowsModel.findByIdAndDelete({
          followerId,
          followingId,
        });
        if (!deleteFollow) {
          throw new UserInputError("User is not following anyone.");
        }
        return deleteFollow;
      } catch (error) {
        throw new UserInputError(error.message || "Failed to unfollow user."); // Updated variable name here
      }
    },
  },
};

export default userFollows;
