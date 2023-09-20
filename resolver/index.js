import resolvers from "../resolver/userProfile.js";
import createUser from "../resolver/users.js";
import userFollowsResolvers from "../resolver/userFollows.js";
import SportsResolvers from "../resolver/sports.js";
import teamsResolvers from "../resolver/teams.js";
import competitionsResolvers from "../resolver/competitions.js";
import governingResolvers from "../resolver/governingBodies.js";
import coachesResolver from "../resolver/coaches.js"
import videosResolver from "../resolver/videos.js"
import playersResolvers from "../resolver/players.js"
// import verifyResolvers from "../resolver/otp.js";
// import otpResolvers from "../resolver/verifyOtp.js"
import authUserResolvers from "../resolver/authResolver.js"
import likeResolvers from "../resolver/likes.js";
import commentResolvers from "../resolver/comments.js";

const allResolvers = [
  resolvers,
  createUser,
  userFollowsResolvers,
  SportsResolvers,
  teamsResolvers,
  playersResolvers,
  competitionsResolvers,
  governingResolvers,
  coachesResolver,
  videosResolver,
  // verifyResolvers,
  // otpResolvers,
  authUserResolvers,
  likeResolvers,
  commentResolvers,
];
export default allResolvers;
