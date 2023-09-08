import resolvers from "../resolver/userProfile.js";
import createUser from "../resolver/users.js";
import userFollows from "../resolver/userFollows.js";
import Players from "../resolver/sports.js";
import createTeams from "../resolver/teams.js";

const allResolvers = [resolvers, createUser, userFollows, Players, createTeams];
export default allResolvers;
