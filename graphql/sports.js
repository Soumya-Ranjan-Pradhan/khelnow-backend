import { gql } from "apollo-server-express";

const Sports = gql`
 type Sports {
    id: ID!
    name: String!
    slug: String!
    createdAt: String!
    deletedAt: String
}

  input SportsInput {
    name: String!
    slug: String!
  }

  type Query {
    getAllSports: [Sports]
    getSportsById(id: ID!): Sports
  }

  type Mutation {
    createSports(sportsInput: SportsInput!): Sports
    updateSports(id: ID!, sportsInput: SportsInput!): Sports
    deleteSports(id: ID!): Boolean 
  }
`;

export { Sports };
