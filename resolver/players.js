import PlayersModel from "../model/Players.js";
import { UserInputError } from "apollo-server-express";

const playersResolvers = {
  Query: {
    getPlayers: async () => {
      try {
        const players = await PlayersModel.find();
        return players;
      } catch (err) {
        throw new UserInputError(err.message || "Failed to fetch players");
      }
    },
    getPlayerById: async (_, { id }) => {
      try {
        const player = await PlayersModel.findById(id);
        if (!player) {
          throw new UserInputError("Player not found");
        }
        return player;
      } catch (err) {
        throw new UserInputError(err.message || "Failed to fetch player");
      }
    },
    
  },
  Mutation: {
    createPlayer: async (_, { playerInput }) => {
      try {
        const playerExist = await PlayersModel.findOne({
          name: playerInput.name,
          slug: playerInput.slug,
          sportsType: playerInput.sportsType,
          avatarUrl: playerInput.avatarUrl,
        });

        if (playerExist) {
          throw new UserInputError("Player already exists");
        }

        const newPlayer = new PlayersModel(playerInput);
        const savedPlayer = await newPlayer.save();
        return savedPlayer;
      } catch (err) {
        throw new UserInputError(err.message || "Failed to create Player");
      }
    },
    updatePlayer: async (_, { _id, playerInput }) => {
      try {
        const updatedPlayer = await PlayersModel.findByIdAndUpdate(
          _id,
          playerInput,
          { new: true }
        );

        if (!updatedPlayer) {
          throw new UserInputError("Player not found");
        }

        return updatedPlayer;
      } catch (err) {
        throw new UserInputError(err.message || "Failed to update Player");
      }
    },
    deletePlayer: async (_, { _id }) => {
      try {
        const deletedPlayer = await PlayersModel.findByIdAndRemove(_id);
        if (!deletedPlayer) {
          throw new UserInputError("Player not found");
        }
        return deletedPlayer;
      } catch (err) {
        throw new UserInputError(err.message || "Failed to delete Player");
      }
    },
  },
};

export default playersResolvers;
