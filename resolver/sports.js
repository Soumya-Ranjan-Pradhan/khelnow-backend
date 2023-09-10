import SportsModel from "../model/Sports.js";
import { UserInputError } from "apollo-server-express";

const SportsResolvers = {
  Query: {
    getAllSports: async () => {
      try {
        const sports = await SportsModel.find();
        return sports;
      } catch (err) {
        throw new UserInputError(err.message || "Failed to fetch sports");
      }
    },
    getSportsById: async (_, { id }) => {
      try {
        const sports = await SportsModel.findById(id);
        if (!sports) {
          throw new UserInputError("Sports not found");
        }
        return sports;
      } catch (err) {
        throw new UserInputError(err.message || "not create Sports");
      }
    },
  },
  Mutation: {
    createSports: async (_, { sportsInput }) => {
      try {
        const existingSports = await SportsModel.findOne({ name: sportsInput.name, slug: sportsInput.slug });
    
        if (existingSports) {
          throw new UserInputError('Sports entry with this data already exists');
        }
    
        const newSports = await SportsModel.create(sportsInput);
        return newSports;
      } catch (err) {
        console.error("Error in createSports resolver:", err);
        throw new UserInputError(err.message || 'Failed to create Sports');
      }
    },
    

    updatePlayer: async (_, { id, sportsInput }) => {
      try {
        const updatedSports = await SportsModel.findByIdAndUpdate(
          id,
          sportsInput,
          { new: true }
        );

        if (!updatedSports) {
          throw new UserInputError("Sports not found");
        }

        return updatedSports;
      } catch (err) {
        throw new UserInputError(err.message || "Failed to update Sports");
      }
    },

    deletePlayer: async (_, { id }) => {
      try {
        const deletedSports = await SportsModel.findByIdAndRemove(id);
        if (!deletedSports) {
          throw new UserInputError("Sports not found");
        }
        return deletedSports;
      } catch (err) {
        throw new UserInputError(err.message || "Failed to delete Sports");
      }
    },
  },
};

export default SportsResolvers;
