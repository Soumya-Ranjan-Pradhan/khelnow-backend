import { gql } from 'apollo-server-express';

const userProfile = gql`
  type UserProfile {
    userId: ID!
    bio: String!
    job: String!
    address: String!
    city: String!
    country: String!
    zipcode: Int!
    language: String!
    notification: Boolean!
    facebookUrl: String!
    instagramUrl: String!
    twitterUrl: String!
    location: String!
    createdAt: String
    deletedAt: String
  }

  input UserProfileInput {
    userId: ID!
    bio: String!
    job: String!
    address: String!
    city: String!
    country: String!
    zipcode: Int!
    language: String!
    notification: Boolean!
    facebookUrl: String!
    instagramUrl: String!
    twitterUrl: String!
    location: String!
  }

  type Query {
    getUserProfile(userId: ID!): UserProfile  
    getAllUserProfiles: [UserProfile!]!
  }

  type Mutation {
    createProfile(userProfileInput: UserProfileInput!): UserProfile
    updateProfile(userId: ID!, userProfileInput: UserProfileInput!): UserProfile
    deleteProfile(userId: ID!): UserProfile
  }
`;

export { userProfile };
