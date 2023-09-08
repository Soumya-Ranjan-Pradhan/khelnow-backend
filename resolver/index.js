import resolvers from "../resolver/userProfile.js";
import createUser from "../resolver/users.js";
import userFollows from "../resolver/userFollows.js";
import Players from "../resolver/sports.js";
import createTeams from "../resolver/teams.js";
import competitionsResovers from "../resolver/competitions.js";
import governingResolvers from "../resolver/governingBodies.js";
import coachesResolver from "../resolver/coaches.js"
import videosResolver from "../resolver/videos.js"

const allResolvers = [
  resolvers,
  createUser,
  userFollows,
  Players,
  createTeams,
  competitionsResovers,
  governingResolvers,
  coachesResolver,
  videosResolver
];
export default allResolvers;
