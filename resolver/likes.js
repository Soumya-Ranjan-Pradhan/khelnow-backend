import { AuthenticationError, UserInputError } from "apollo-server-express";
import LikeModel from "../model/Likes.js";

const likeResolvers = {
  Query: {
    getAllLikes: async (_, { videoId }) => {
      try {
        const likes = await LikeModel.find({ videoId }).exec();
        return likes;
      } catch (error) {
        throw new UserInputError("Error fetching likes");
      }
    },

    getLikeCount: async (_, { videoId }) => {
      try {
        const likeCount = await LikeModel.countDocuments({ videoId }).exec();
        return { likeCount };
      } catch (error) {
        throw new UserInputError("Error fetching like count");
      }
    },
  },

  Mutation: {
    createLike: async (_, { input }, context) => {
      try {
        const userId = context.userId;
        if (!userId) {
          throw new AuthenticationError("User not authenticated");
        }

        const existingLike = await LikeModel.findOne({
          videoId: input.videoId,
          userId,
        });

        if (existingLike) {
          throw new UserInputError("User has already liked this video.");
        }

        const newLike = await LikeModel.create({
          videoId: input.videoId,
          userId,
        });

        return newLike;
      } catch (error) {
        throw new UserInputError(`Failed to create like: ${error.message}`);
      }
    },

    
    deleteLike: async (_, { id }, context) => {
      try {
        const deletedLike = await LikeModel.findByIdAndDelete(id).exec();

        if (!deletedLike) {
          throw new UserInputError("Like not found.");
        }

        return deletedLike;
      } catch (error) {
        console.error("Error deleting like:", error);
        throw new UserInputError(
          "Failed to delete like: An internal server error occurred."
        );
      }
    },
  },
};

export default likeResolvers;
