import TeamModel from "../model/Teams.js";
import { UserInputError } from "apollo-server-express";

const teamsResolvers = {
  Query: {
    teams: async () => {
      try {
        const teams = await TeamModel.find();
        return teams;
      } catch (err) {
        throw new UserInputError(err.message);
      }
    },

    team: async (_, { id }) => {
      try {
        const team = await TeamModel.findById(id);
        if (!team) {
          throw new UserInputError("Team not found");
        }
        return team;
      } catch (err) {
        throw new UserInputError(err.message || "Team not found");
      }
    },
  },
  Mutation: {
    createTeam: async (_, { input }) => {
      try {
        const newTeam = await TeamModel.create(input);
        return newTeam;
      } catch (error) {
        throw new UserInputError(error.message || "Failed to create Team");
      }
    },
    updateTeam: async (_, { id, input }) => {
      try {
        const updatedTeam = await TeamModel.findByIdAndUpdate(id, input, {
          new: true,
        });
        if (!updatedTeam) {
          throw new UserInputError("Team not found");
        }
        return updatedTeam;
      } catch (error) {
        throw new UserInputError(error.message || "Failed to update Team");
      }
    },
    deleteTeam: async (_, { id }) => {
      try {
        const deletedTeam = await TeamModel.findByIdAndRemove(id);
        if (!deletedTeam) {
          throw new UserInputError("Team not found");
        }
        return deletedTeam;
      } catch (error) {
        throw new UserInputError(error.message || "Failed to delete Team");
      }
    },
  },
};

export default teamsResolvers;
