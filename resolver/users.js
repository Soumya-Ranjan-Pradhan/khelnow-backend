import userModel from "../model/Users.js";
import { UserInputError } from "apollo-server-express";

const createUser = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await userModel.findById(id);
        return user;
      } catch (error) {
        throw new UserInputError(err.message || "Failed to fetch user");
      }
    },
    getUsers: async () => {
      try {
        const users = await userModel.find();
        return users;
      } catch (error) {
        throw new UserInputError(err.message || "Failed to fetch users");
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const userProfile = new userModel(input);
        await userProfile.save();
        return userProfile;
      } catch (error) {
        throw new UserInputError(err.message || "Error creating user profile");
      }
    },
    updateUser: async (_, { id, input }) => {
      try {
        const updatedUser = await userModel.findByIdAndUpdate(id, input, {
          new: true,
        });
    
        if (!updatedUser) {
          throw new UserInputError("User not found");
        }
    
        return updatedUser;
      } catch (error) {
        console.error("Error updating user:", error);
        throw new UserInputError(err.message || "Failed to update user");
      }
    },
    
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
          throw new UserInputError("User not found");
        }

        return { message: "User deleted successfully" };
      } catch (error) {
        throw new UserInputError(err.message || "Failed to delete user");
      }
    },
  },
};

export default createUser;
