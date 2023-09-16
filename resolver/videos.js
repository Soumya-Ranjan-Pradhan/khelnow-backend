import videosModel from "../model/Videos.js";
import { UserInputError } from "apollo-server-express";
import { verifyToken } from "../middleware/verifyToken.js";

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
    video: async (_, { id }, context) => {
      try {
        await verifyToken(context.req, context.res, () => {});
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
<<<<<<< HEAD
        await verifyToken(context.req, context.res, () => {});
        const existingVideo = await videosModel.findOne({
          videoUrl: input.videoUrl,
          // $or: [{ videoUrl: input.videoUrl }, { caption: input.caption }],
=======
        const userId = context.userId; 
        console.log("🚀 ~ file: videos.js:33 ~ createVideo: ~ userId:", userId)
        input.userId = userId;
    
        const existingVideo = await videosModel.findOne({
          videoUrl: input.videoUrl,
>>>>>>> 12b04f0e363b6a18c5d84a72f4bb21cbe6415ac3
        });

        if (existingVideo) {
          throw new UserInputError("Video already exists");
        }

        const newVideo = await videosModel.create(input);
        newVideo.userId = userId;
        console.log("🚀 ~ file: videos.js:46 ~ createVideo: ~ newVideo:", newVideo)
        return newVideo;
      } catch (error) {
        throw new UserInputError(`Failed to create video: ${error.message}`);
      }
    },

    updateVideo: async (_, { id, input }) => {
      try {
        await verifyToken(context.req, context.res, () => {});
        const updatedVideo = await videosModel.findByIdAndUpdate(id, input, {
          new: true,
        });
        if (!updatedVideo) {
          throw new UserInputError("Video not found");
        }
        return updatedVideo;
      } catch (error) {
        throw new UserInputError(`Failed to update video: ${error.message}`);
      }
    },

    deleteVideo: async (_, { id }) => {
      try {
        await verifyToken(context.req, context.res, () => {});
        const deletedVideo = await videosModel.findByIdAndRemove(id);
        if (!deletedVideo) {
          throw new UserInputError("Video not found");
        }
        return deletedVideo;
      } catch (error) {
        throw new UserInputError(`Failed to delete video: ${error.message}`);
      }
    },
  },
};

export default videosResolver;
