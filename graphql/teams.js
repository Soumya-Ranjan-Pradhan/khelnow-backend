
import { gql } from "apollo-server-express";

const Teams = gql`
  type Team {
    _id: ID!
    name: String!
    sportsType: Sports!
    logoUrl: String!
    slug: String!
    createdAt: String!
    deletedAt: String
  }

  input TeamInput {
    name: String!
    sportsType: ID!
    logoUrl: String!
    slug: String!
  }

  type Query {
    getAllTeams: [Team!]!
    getTeamById(_id: ID!): Team
  }

  type Mutation {
    createTeam(teamInput: TeamInput!): Team!
    updateTeam(_id: ID!, teamInput: TeamInput!): Team!
    deleteTeam(_id: ID!): Team!
  }
`;

export { Teams };
