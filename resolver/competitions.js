import CompetitionsModel from "../model/Competitions.js";
import { UserInputError } from "apollo-server-express";
import { verifyToken } from "../middleware/verifyToken.js"; 

const competitionsResolvers = {
  Query: {
    competition: async (_, __, context) => {
      try {
        await verifyToken(context.req, context.res,() => { }); 
        const competitions = await CompetitionsModel.find();
        return competitions;
      } catch (err) {
        throw new UserInputError(err.message || "Competitions not get");
      }
    },

    competition: async (_, { id }, context) => {
      try {
        await verifyToken(context.req, context.res,() => { }); // Use the middleware here
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
    createCompetition: async (_, { input }, context) => {
      try {
        await verifyToken(context.req, context.res,() => { }); 
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

    updateCompetition: async (_, { id, input }, context) => {
      try {
        await verifyToken(context.req, context.res,() => { }); 
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

    deleteCompetition: async (_, { id }, context) => {
      try {
        await verifyToken(context.req, context.res,() => { });
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
