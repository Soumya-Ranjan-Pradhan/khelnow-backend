import { gql } from 'apollo-server-express';

const videos = gql `
  type Video {
    id: ID!
    videoUrl: String
    caption: String
    sportsType: String
    thumbnailUrl: String
    duration: String
    createdAt: String
    deletedAt: String
  }

  input VideoInput {
    videoUrl: String
    userId: String
    caption: String
    sportsType: String
    thumbnailUrl: String
    duration: String
  }

  type Query {
    videos: [Video]
    video(id: ID!): Video
  }

  type Mutation {
    createVideo(input: VideoInput): Video
    updateVideo(id: ID!, input: VideoInput): Video
    deleteVideo(id: ID!): Video
  }
`
export { videos }
