import { gql } from "apollo-server-express";

const Players = gql`
  type Sports {
    _id: ID!
    name: String!
  }

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
    TABLE
    TENNIS
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
  getPlayers: [Player]
  getPlayerById(id: ID!): Player
}

  type Mutation {
    createPlayer(playerInput: PlayerInput!): Player
    updatePlayer(id: ID!, playerInput: PlayerInput!): Player
    deletePlayer(id: ID!): Player
  }
`;

export { Players };
