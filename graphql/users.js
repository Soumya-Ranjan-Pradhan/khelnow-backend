import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    mobile: String
    password: String
    avatarUrl: String
    userName: String!
    latestRefreshToken: String
    role: String
    deviceIds: [String]
    createdAt: String
    deletedAt: String
    tokens: [Token]
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    mobile: String
    password: String
    avatarUrl: String
    userName: String!
    latestRefreshToken: String
    role: String
    deviceIds: [String]
  }


  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): User
    # sendOTP(toEmail: String!): StatusResponse
    # verifyOTP(input: VerifyOTPInput!): OTPVerificationResponse
    # sendAndVerifyOTP(input: VerifyOTPInput!): OTPVerificationResponse
  }
`;

export { typeDefs };
