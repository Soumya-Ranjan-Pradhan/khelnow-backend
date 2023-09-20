import { gql } from "apollo-server-express";

export const likeTypeDefs = gql`
  type Like {
    id: ID!
    videoId: ID!
    userId: ID
    likedDate: String
    isLike: Boolean
    likeCount:Int
  }
  type LikeCount {
    likeCount: Int
  }
  input likeInput {
    videoId: ID!
    userId: ID
  }

  type Query {
    getAllLikes(videoId: ID!, userId: ID): [Like]
    getLikeCount(videoId: ID!): LikeCount
  }
  type Mutation {
    createLike(input: likeInput): Like
    deleteLike(id: ID!): Like
  }
`;

// import { gql } from "apollo-server-express";

// export const likeTypeDefs = gql`
//   type Like {
//     id: ID!
//     videoId: ID!
//     userId: ID
//     likedDate: String
//     isLike: Boolean
//     likeCount:Int
//   }
//   type LikeCount {
//     likeCount: Int
//   }
//   input likeInput {
//     videoId: ID!
//     userId: ID
//   }
//   type Query {
//     getAllLikes(videoId: ID!, userId: ID): [Like]
//     getLikeCount(videoId: ID!): LikeCount
//   }
//   type Mutation {
//     createLike(likeInput: likeInput): Like
//     deleteLike(id: ID): Like
//   }
// `;
