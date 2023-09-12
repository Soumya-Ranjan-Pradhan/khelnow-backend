import coachesModel from "../model/Coaches.js";
import { UserInputError } from "apollo-server-express";
import {verifyToken} from "../middleware/verifyToken.js"

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
    coach: async (_, { id }, context) => { 
      try {
        await verifyToken(context.req, context.res, () => {}); 
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
    createCoach: async (_, { input }, context) => {
      try {
        await verifyToken(context.req, context.res, () => {});
        const existingCoach = await coachesModel.findOne({ name: input.name });
    
        if (existingCoach) {
          throw new UserInputError("Coach already exists");
        }
    
        const newCoach = await coachesModel.create(input);
        return newCoach;
      } catch (error) {
        throw new UserInputError(`Failed to create coach: ${error.message}`);
      }
    },
    

    updateCoach: async (_, { id, input },context) => {
      try {
        await verifyToken(context.req, context.res, () => {});
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

    deleteCoach: async (_, { id }, context) => {
      try {
        await verifyToken(context.req, context.res, () => {});  
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
