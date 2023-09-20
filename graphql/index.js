import { typeDefs } from "../graphql/users.js";
import { userProfile } from "../graphql/profile.js";
import { userFollows } from "../graphql/userFollows.js";
import { Sports } from "../graphql/sports.js";
import { Teams } from "../graphql/teams.js";
import { Players } from "../graphql/players.js";
import { competitions } from "../graphql/competitions.js";
import { governingBodies } from "../graphql/governigBodies.js";
import { coaches } from "../graphql/coaches.js";
import { videos } from "../graphql/videos.js";
import {authUserTypeDefs} from "../graphql/authUser.js"
import {likeTypeDefs} from "../graphql/likes.js"
import { commentTypeDefs } from "../graphql/comments.js";

const AllTypeDefs = [
  typeDefs,
  userProfile,
  userFollows,
  Sports,
  Teams,
  Players,
  competitions,
  governingBodies,
  coaches,
  videos,
  authUserTypeDefs,
  likeTypeDefs,
  commentTypeDefs
];

export default AllTypeDefs;
