const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        content: String!
        username: String!
        createdAt: String!
        updatedAt: String
        comments: [Comment]
        likes: [Like]
    }

    type Like {
        username: String!
    }

    type Comment {
        id: ID!
        content: String!
        createdAt: String!
        username: String!
        comments: [Comment]
        likes: [Like]
        updatedAt: String
    }
    
    type User {
        id: ID!
        email: String!
        username: String!
        token: String!
    }

    input CreateUserInput {
        username: String!
        email: String!
        password: String!
    }

    type Query {
        getPosts: [Post]!
        getPost(id: String!): Post!
        getUsers: [User]
    }

    type Mutation {
        createUser(createUserInput: CreateUserInput): User!
        loginUser(username: String! password: String!): User!
        createPost(content: String!): Post!
        updatePost(id: String! content: String!): Post!
        deletePost(id: String!): String!
        createComment(id: String! content: String!): Comment!
        deleteComment(id: String! commentId: String!): String!
        likePost(id: String!): Post!
    }
`;