import { gql } from "apollo-server-express";

const Teams = gql`

type Sports {
    _id: ID!
    name: String!
  }
 
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
    sportsTypeId: ID!
    logoUrl: String!
    slug: String!
  }

  type Query {
    getTeams: [Team]
    getTeam(id: ID!): Team
  }

  type Mutation {
    createTeam(input: TeamInput!): Team
    updateTeam(id: ID!, input: TeamInput!): Team
    deleteTeam(id: ID!): Team
  }
`;

export { Teams };
