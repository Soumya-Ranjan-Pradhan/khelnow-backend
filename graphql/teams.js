
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

  type Sports {
    _id: ID!
    name: String!
  }

  input TeamInput {
    name: String!
    sportsType: ID!
    logoUrl: String!
    slug: String!
  }

  type Query {
    teams: [Team]
    team(id: ID!): Team
  }

  type Mutation {
    createTeam(input: TeamInput): Team
    updateTeam(id: ID!, input: TeamInput): Team
    deleteTeam(id: ID!): Team
  }
`;

export { Teams };
