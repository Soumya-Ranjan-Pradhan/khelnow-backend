
import { gql } from "apollo-server-express";

const Sports = gql`
  type Sports {
    _id: ID!
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
    getAllSports: [Sports!]!
    getSportsById(_id: ID!): Sports
  }

  type Mutation {
    createSports(sportsInput: SportsInput!): Sports!
    updateSports(_id: ID!, sportsInput: SportsInput!): Sports!
    deleteSports(_id: ID!): Sports!
  }
`;

export { Sports };
