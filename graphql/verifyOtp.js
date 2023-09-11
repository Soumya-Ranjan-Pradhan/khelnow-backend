
// import { gql } from 'apollo-server-express';

// const typeDefs = gql`
//   type AuthTokens {
//     accessToken: String!
//     refreshToken: String!
//   }

//   input LoginInput {
//     email: String!
//     deviceIds: String
//   }

//   input RegisterInput {
//     userName: String!
//     email: String!
//     firstName: String
//     lastName: String
//     deviceIds: String
//   }

//   input ValidateInput {
//     otp: Int!
//     email: String
//   }

//   type LoginResponse {
//     success: Boolean!
//     message: String!
//   }

//   type Mutation {
//     login(input: LoginInput!): LoginResponse
//     register(input: RegisterInput!): LoginResponse
//     validateWithOtp(input: ValidateInput): AuthTokens
//   }
// `;

// export default typeDefs;
