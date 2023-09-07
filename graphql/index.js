import { typeDefs } from "../graphql/users.js";
import { userProfile } from "../graphql/profile.js";
import { userFollows } from "../graphql/userFollows.js";
import { Sports } from "../graphql/sports.js";
import { Teams } from "../graphql/teams.js";

const AllTypeDefs = [typeDefs, userProfile, userFollows, Sports, Teams];

export default AllTypeDefs;
