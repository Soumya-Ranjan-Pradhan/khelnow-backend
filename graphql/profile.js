import { gql } from "apollo-server-express";

const userProfile = gql`
  type userProfile {
    userId: ID!
    bio: String!
    dob: String
    address: String
    city: String
    country: String
    zipCode: Int
    language: String
    notification: Boolean
    role: String
    facebookUrl: String
    instagramUrl: String
    twitterUrl: String
    location: String
    createdAt: String
    deletedAt: String
  }
  input UserProfileInput {
    userId: ID!
    bio: String!
    dob: String
    address: String
    city: String
    country: String
    zipCode: Int
    language: String
    notification: Boolean
    role: String
    facebookUrl: String
    instagramUrl: String
    twitterUrl: String
    location: String
    createdAt: String
    deletedAt: String
  }

  type Query{
    getUserProfile(userId: ID) :userProfile
    getAllUserProfile: [userProfile!]!
  }


  type Mutation {
    createProfile(userProfileInput: UserProfileInput): UserProfile
    updateProfile(id: ID!, updatedFields: UserProfileInput): UserProfile
    deleteProfile(userId: ID!): UserProfile
  }
`;
