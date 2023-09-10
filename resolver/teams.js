import TeamModel from "../model/Teams.js"; 

const teamsResolvers = {
  Query: {
    getTeams: async () => {
      try {
        const teams = await TeamModel.find();
        return teams;
      } catch (error) {
        throw new Error("Failed to fetch teams");
      }
    },
    getTeam: async (_, { id }) => {
      try {
        const team = await TeamModel.findById(id);
        if (!team) {
          throw new Error("Team not found");
        }
        return team;
      } catch (error) {
        throw new Error("Failed to fetch team");
      }
    },
  },
  Mutation: {
    createTeam: async (_, { input }) => {
      try {
        const { name, sportsTypeId, logoUrl, slug } = input;

        const teamExist = await TeamModel.findOne({ name });

        if (teamExist) {
          throw new Error("Team with this name already exists");
        }

        const newTeam = new TeamModel({
          name,
          sportsType: sportsTypeId, 
          logoUrl,
          slug,
          createdAt: new Date().toISOString(),
        });

        await newTeam.save();

        return newTeam;
      } catch (error) {
        throw new Error("Failed to create Team");
      }
    },
    updateTeam: async (_, { id, input }) => {
      try {
        const updatedTeam = await TeamModel.findByIdAndUpdate(id, input, {
          new: true,
        });
        if (!updatedTeam) {
          throw new Error("Team not found");
        }
        return updatedTeam;
      } catch (error) {
        throw new Error("Failed to update Team");
      }
    },
    deleteTeam: async (_, { id }) => {
      try {
        const deletedTeam = await TeamModel.findByIdAndRemove(id);
        if (!deletedTeam) {
          throw new Error("Team not found");
        }
        return deletedTeam;
      } catch (error) {
        throw new Error("Failed to delete Team");
      }
    },
  },
};

export default teamsResolvers;
