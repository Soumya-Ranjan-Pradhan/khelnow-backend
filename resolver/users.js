import userModel from "../model/Users.js";
import { UserInputError } from "apollo-server-express";

const createUser = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        return await userModel.findById(id);
      } catch (error) {
        throw new UserInputError("Failed to fetch user", { error });
      }
    },
    getUsers: async () => {
      try {
        return await userModel.find();
      } catch (error) {
        throw new UserInputError("Failed to fetch users", { error });
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const [existingUserByEmail, existingUserByUserName] = await Promise.all([
          userModel.findOne({ email: input.email }),
          userModel.findOne({ userName: input.userName }),
        ]);
  
        if (existingUserByEmail) {
          throw new UserInputError("User with this email already exists");
        }
  
        if (existingUserByUserName) {
          throw new UserInputError("User with this username already exists");
        }
  
        const newUser = new userModel(input);
        await newUser.save();
        return newUser;
      } catch (err) {
        console.error("Error creating user:", err);
        throw new UserInputError("Failed to create user", { error: err });
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
        throw new UserInputError("Failed to update user", { error });
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
        console.error("Error deleting user:", error);
        throw new UserInputError("Failed to delete user", { error });
      }
    },
  },
};

export default createUser;
