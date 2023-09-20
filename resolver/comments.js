import { AuthenticationError, UserInputError } from "apollo-server-express";
import CommentModel from "../model/comments.js";

const commentResolvers = {
  Query: {
    getAllComments: async (_, { id }) => {
      try {
        const comments = await CommentModel.find({ videoId: id }).exec();
        console.log("🚀 ~ file: comments.js:9 ~ getAllComments: ~ comments:", comments)
        return comments;
      } catch (error) {
        throw new Error("Error fetching comments");
      }
    },
  },

  Mutation: {
    createComment: async (_, { input }, context) => {
      try {
        const userId = context.userId;
        input.userId = userId;
        const newComments = await CommentModel.create(input);
        // console.log("🚀 ~ file: comments.js:22 ~ createComment: ~ newComments:", newComments)
        return newComments;
      } catch (error) {
        throw new Error(`Error creating comment: ${error.message}`);
      }
    },

    updateComment: async (_, { id, input }, context) => {
      try {
        const userId = context.userId;
        if (!userId) {
          throw new AuthenticationError("User not authenticated");
        }
        const updatedComment = await CommentModel.findByIdAndUpdate(id, input, {
          _id: id,
          userId,
          input,
          new: true,
        }).exec();

        if (!updatedComment) {
          throw new UserInputError("Comment not found.");
        }

        return updatedComment;
      } catch (error) {
        throw new Error("Error updating comment");
      }
    },

    deleteComment: async (_, { id }) => {
      try {
        const userId = context.userId;
        if (!userId) {
          throw new AuthenticationError('User not authenticated');
        }
        const deletedComment = await CommentModel.findByIdAndDelete({ _id: id, userId }).exec();

        if (!deletedComment) {
          throw new UserInputError("Comment not found.");
        }

        return deletedComment;
      } catch (error) {
        throw new Error("Error deleting comment");
      }
    },
  },
};

export default commentResolvers;
