import { gql } from "apollo-server-express";

export const authUserTypeDefs = gql`
  input RegisterInput {
    userName: String!
    email: String!
    firstName: String
    lastName: String
    deviceIds: String
    mobile: String
  }

  input ValidateInput {
    email: String
    enteredOTP: String!
  }

  type StatusResponse {
    message: String
    error: String
  }

  type LoginResponse {
    success: Boolean!
    message: String!
  }

  type OTPVerificationResponse {
    success: Boolean!
    message: String!
    accessToken: String
    refreshToken: String
  }

  type AuthTokens {
    accessToken: String!
    refreshToken: String!
  }

  input LoginInput {
    email: String!
    deviceIds: String
  }

  type Token {
    tokenValue: String
  }

  type StatusResponse {
    message: String
    error: String
  }

  type Mutation {
    login(input: LoginInput!): LoginResponse
    register(input: RegisterInput!): LoginResponse
    validateWithOtp(input: ValidateInput): OTPVerificationResponse
    sendOTP(toEmail: String!): StatusResponse
  }
`;
