import CompetitionsModel from "../model/Competitions.js";
import { UserInputError } from "apollo-server-express";

const competitionsResolvers = {
  Query: {
    competition: async () => {
      try {
        const competition = await CompetitionsModel.find();
        return competition;
      } catch (err) {
        throw new UserInputError(err.message || "competitions not get");
      }
    },
    competitions: async (_, { id }) => {
      try {
        const competitions = await CompetitionsModel.findById(id);
        if (!competitions) {
          throw new UserInputError("competitions not found");
        }
        return competitions;
      } catch (err) {
        throw new UserInputError(err.message || "no create competitions");
      }
    },
  },
  Mutation: {
    createCompetition: async (_, { input }) => {
      try {
        const newCompetition = await CompetitionsModel.create(input);
        return newCompetition;
      } catch (error) {
        throw new UserInputError(
          error.message || "failed to create competitions"
        );
      }
    },
    updateCompetition: async (_, { id, input }) => {
      try {
        const updatedCompetition = await CompetitionsModel.findByIdAndUpdate(
          id,
          input,
          { new: true }
        );
        if (!updatedCompetition) {
          throw new UserInputError("Competition not found");
        }
        return updatedCompetition;
      } catch (error) {
        throw new UserInputError(
          error.message || "Failed to update competition"
        );
      }
    },
    deleteCompetition: async (_, { id }) => {
      try {
        const deletedCompetition = await CompetitionsModel.findByIdAndRemove(id);
        if (!deletedCompetition) {
          throw new UserInputError("Competition not found");
        }
        return deletedCompetition;
      } catch (error) {
        throw new UserInputError(
          error.message || "Failed to delete competition"
        );
      }
    },
  },
};

export default competitionsResolvers;
