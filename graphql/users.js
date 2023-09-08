import { gql } from "apollo-server-express";

const typeDefs = gql`
  
  type User {
    _id:ID!
    userName: String!
    lastName: String!
    email: String!
    firstName: String!
    mobile: String!
    completed: Boolean
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    mobile: String
    userName: String!
  }
  
  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): User
  }
`;

export { typeDefs };
