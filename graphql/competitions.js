import { gql } from 'apollo-server-express';

const competitions = gql`

 type Competition {
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

  input CompetitionInput {
    name: String!
    sportsType: ID!
    logoUrl: String!
    slug: String!
  }

  type Query {
    competitions: [Competition]
    competition(id: ID!): Competition
  }

  type Mutation {
    createCompetition(input: CompetitionInput): Competition
    updateCompetition(id: ID!, input: CompetitionInput): Competition
    deleteCompetition(id: ID!): Competition
  }

`

export { competitions } 