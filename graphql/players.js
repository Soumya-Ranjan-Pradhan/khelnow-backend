import { gql } from 'apollo-server-express';

const Players = gql`
  type Player {
    _id: ID!
    name: String!
    sportsType: Sports!
    avatarUrl: String!
    slug: String!
    createdAt: String!
    deletedAt: String
  }

  enum Sports {
    CRICKET
    KABADDI
    FOOTBALL
    BADMINTON
    TENNIS
    TABLE TENNIS
    HOCKEY
    WWE
  }

  input PlayerInput {
    name: String!
    sportsType: ID!
    avatarUrl: String!
    slug: String!
  }

  type Query {
    getAllPlayers: [Player!]!
    getPlayerById(_id: ID!): Player
  }

  type Mutation {
    createPlayer(playerInput: PlayerInput!): Player!
    updatePlayer(_id: ID!, playerInput: PlayerInput!): Player!
    deletePlayer(_id: ID!): Player
  }
`;

export { Players };
