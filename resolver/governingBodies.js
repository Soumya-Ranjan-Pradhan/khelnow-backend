import GoverningBodiesSchemaModel from '../model/GoverningBodies.js';
import { UserInputError } from "apollo-server-express"

const governingBodies = {
  Query: {
    governingBodies: async () => {
      try {
        const governingBodies = await GoverningBodiesSchemaModel.find();
        return governingBodies;
      } catch (error) {
        throw new UserInputError(`Failed to fetch governing bodies: ${error.message}`);
      }
    },
    governingBody: async (_, { id }) => {
      try {
        const governingBody = await GoverningBodiesSchemaModel.findById(id);
        if (!governingBody) {
          throw new UserInputError('Governing Body not found');
        }
        return governingBody;
      } catch (error) {
        throw new UserInputError(`Failed to fetch governing body: ${error.message}`);
      }
    },
  },
  Mutation: {
    createGoverningBody: async (_, { input }) => {
      try {
        const existingGoverningBody = await GoverningBodiesSchemaModel.findOne({ name: input.name });
    
        if (existingGoverningBody) {
          throw new UserInputError("Governing body already exists");
        }
    
        const newGoverningBody = await GoverningBodiesSchemaModel.create(input);
        return newGoverningBody;
      } catch (error) {
        throw new UserInputError(`Failed to create governing body: ${error.message}`);
      }
    },
    
    updateGoverningBody: async (_, { id, input }) => {
      try {
        const updatedGoverningBody = await GoverningBodiesSchemaModel.findByIdAndUpdate(
          id,
          input,
          {
            new: true,
          }
        );
        if (!updatedGoverningBody) {
          throw new UserInputError('Governing Body not found');
        }
        return updatedGoverningBody;
      } catch (error) {
        throw new UserInputError(`Failed to update governing body: ${error.message}`);
      }
    },
    deleteGoverningBody: async (_, { id }) => {
      try {
        const deletedGoverningBody = await GoverningBodiesSchemaModel.findByIdAndRemove(
          id
        );
        if (!deletedGoverningBody) {
          throw new UserInputError('Governing Body not found');
        }
        return deletedGoverningBody;
      } catch (error) {
        throw new UserInputError(`Failed to delete governing body: ${error.message}`);
      }
    },
  },
};

export default governingBodies;
