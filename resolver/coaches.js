import coachesModel from "../model/GoverningBodies.js";
import { UserInputError } from "apollo-server-express";

const coachesResolver = {
  Query: {
    coaches: async () => { 
      try {
        const coaches = await coachesModel.find();
        return coaches;
      } catch (error) {
        throw new UserInputError(
          `Failed to fetch coaches bodies: ${error.message}`
        );
      }
    },
    coach: async (_, { id }) => { 
      try {
        const getCoach = await coachesModel.findById(id);
        if (!getCoach) {
          throw new UserInputError("Coach not found");
        }
        return getCoach;
      } catch (error) {
        throw new UserInputError(
          `Failed to fetch coach: ${error.message}`
        );
      }
    },
  },

  Mutation: {
    createCoach: async (_, { input }) => {
      try {
        const newCoach = await coachesModel.create(input);
        return newCoach;
      } catch (error) {
        throw new UserInputError(`Failed to create coach: ${error.message}`);
      }
    },

    updateCoach: async (_, { id, input }) => {
      try {
        const updatedCoach = await coachesModel.findByIdAndUpdate(
          id,
          input,
          {
            new: true,
          }
        );
        if (!updatedCoach) {
          throw new UserInputError('Coach not found');
        }
        return updatedCoach;
      } catch (error) {
        throw new UserInputError(`Failed to update coach: ${error.message}`);
      }
    },

    deleteCoach: async (_, { id }) => {
      try {
        const deletedCoach = await coachesModel.findByIdAndRemove(
          id
        );
        if (!deletedCoach) {
          throw new UserInputError('Coach not found');
        }
        return deletedCoach;
      } catch (error) {
        throw new UserInputError(`Failed to delete coach: ${error.message}`);
      }
    },
  },
};

export default coachesResolver;
