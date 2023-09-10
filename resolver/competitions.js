import CompetitionsModel from "../model/Competitions.js";
import { UserInputError } from "apollo-server-express";

const competitionsResolvers = {
  Query: {
    competition: async () => {
      try {
        const competition = await CompetitionsModel.find();
        // console.log("competitions", competition)
        return competition;
      } catch (err) {
        throw new UserInputError(err.message || "competitions not get");
      }
    },
    competition: async (_, { id }) => {
      try {
        const competition = await CompetitionsModel.findById(id);
        if (!competition) {
          throw new UserInputError("Competition not found");
        }
        return competition;
      } catch (err) {
        throw new UserInputError(err.message || "Failed to fetch competition");
      }
    },    
  },
  Mutation: {
    createCompetition: async (_, { input }) => {
      try {
        const existingCompetition = await CompetitionsModel.findOne({
          name: input.name,
        });

        if (existingCompetition) {
          throw new UserInputError("Competition already exists");
        }
        const newCompetition = await CompetitionsModel.create(input);
        return newCompetition;
      } catch (error) {
        throw new UserInputError(
          error.message || "Failed to create competition"
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
        const deletedCompetition = await CompetitionsModel.findByIdAndRemove(
          id
        );
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
