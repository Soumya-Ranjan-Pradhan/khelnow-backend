import { gql } from 'apollo-server-express';

const coaches = gql `
 type Coach {
    _id: ID!
    name: String!
    avatarUrl: String!
    slug: String!
    deletedAt: String
    sportsType: Sports!
  }

  type Sports {
    _id: ID!
    name: String!
  }

  input CoachInput {
    name: String!
    avatarUrl: String!
    slug: String!
    sportsType: ID!
  }

  type Query {
    coaches: [Coach]
    coach(id: ID!): Coach
  }

  type Mutation {
    createCoach(input: CoachInput): Coach
    updateCoach(id: ID!, input: CoachInput): Coach
    deleteCoach(id: ID!): Coach
  }
`
export {coaches}