import { gql } from 'apollo-server-express';

const governingBodies = gql`

type GoverningBody {
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

  input GoverningBodyInput {
    name: String!
    sportsType: ID!
    logoUrl: String!
    slug: String!
  }

  type Query {
    governingBodies: [GoverningBody]
    governingBody(id: ID!): GoverningBody
  }

  type Mutation {
    createGoverningBody(input: GoverningBodyInput): GoverningBody
    updateGoverningBody(id: ID!, input: GoverningBodyInput): GoverningBody
    deleteGoverningBody(id: ID!): GoverningBody
  }

`
export { governingBodies }