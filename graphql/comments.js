import { gql } from "apollo-server-express";

export const commentTypeDefs = gql`
  type Comment {
    id: ID!
    userId: ID
    videoId: ID
    parentCommentId: Int
    commentContent: String
    commentedDate: String
  }
  input commentInput {
    userId: ID
    videoId: ID
    parentCommentId: Int
    commentContent: String
  }
  type Query {
    getAllComments(id: ID!): [Comment]
    getCommentById(commentId: ID!): Comment
  }

  type Mutation {
    createComment(input: commentInput): Comment
    updateComment(id: ID, input: commentInput): Comment
    deleteComment(id: ID): Comment
  }
`;
