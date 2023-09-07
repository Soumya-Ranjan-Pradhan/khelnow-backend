import { gql } from "apollo-server-express";

const userFollows = gql`
  type UserFollows {
    _id: ID!
    followerId: ID!
    followingId: ID!
    createdAt: String!
    deletedAt: String
  }

  type Query {
    getAllUserFollows: [UserFollows!]!
  }

  type Mutation {
    followUser(followerId: ID!, followingId: ID!): UserFollows!
    unfollowUser(followerId: ID!, followingId: ID!): UserFollows!
  }
`;

export { userFollows };
