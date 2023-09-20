import videosModel from "../model/Videos.js";
import { UserInputError } from "apollo-server-express";
import { verifyToken } from "../middleware/verifyToken.js"; // Import 'verifyToken' only once

const videosResolver = {
  Query: {
    videos: async () => {
      try {
        const videos = await videosModel.find();
        return videos;
      } catch (error) {
        throw new UserInputError(`Failed to fetch videos: ${error.message}`);
      }
    },
    video: async (_, { id }) => {
      try {
        const video = await videosModel.findById(id);
        if (!video) {
          throw new UserInputError("Video not found");
        }
        return video;
      } catch (error) {
        throw new UserInputError(`Failed to fetch video: ${error.message}`);
      }
    },
  },

  Mutation: {
    createVideo: async (_, { input }, context) => {
      try {
        const userId = context.userId; 
        input.userId = userId;
   
        const existingVideo = await videosModel.findOne({
          videoUrl: input.videoUrl,
        });
       
    
        if (existingVideo) {
          throw new UserInputError("Video already exists");
        }
    
        const newVideo = await videosModel.create(input);
        console.log("🚀 ~ file: videos.js:46 ~ createVideo: ~ input:", input)
        return newVideo;
      } catch (error) {
        throw new UserInputError(`Failed to create video: ${error.message}`);
      }
    },

    updateVideo: async (_, { id, input }, context) => {
      try {
        const userId = context.userId;
        if (!userId) {
          throw new AuthenticationError('User not authenticated');
        }
    
        const updatedVideo = await videosModel.findOneAndUpdate(
          { _id: id, userId }, // Ensure the video belongs to the user
          input,
          { new: true }
        );
    
        if (!updatedVideo) {
          throw new UserInputError("Video not found or does not belong to the user");
        }
    
        return updatedVideo;
      } catch (error) {
        throw new UserInputError(`Failed to update video: ${error.message}`);
      }
    },

    deleteVideo: async (_, { id }, context) => {
      try {
        const userId = context.userId;
        if (!userId) {
          throw new AuthenticationError('User not authenticated');
        }
    
        const deletedVideo = await videosModel.findOneAndRemove({ _id: id, userId });
    
        if (!deletedVideo) {
          throw new UserInputError("Video not found or does not belong to the user");
        }
    
        return deletedVideo;
      } catch (error) {
        throw new UserInputError(`Failed to delete video: ${error.message}`);
      }
    },
    
  },
};

export default videosResolver;
