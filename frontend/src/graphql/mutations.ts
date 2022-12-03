import { gql } from '@apollo/client';

const REGISTER_USER = gql`
    mutation registerUser($username: String! $email: String! $password: String!) {
        createUser(createUserInput: {username: $username email: $email password: $password}) {
            id
            email
            username
            token
        }
    }
`;

const LOGIN_USER = gql`
    mutation loginUser($username: String! $password: String!) {
        loginUser(username: $username password: $password) {
            id
            username
            email
            token
        }
    }
`;

const CREATE_POST = gql`
    mutation createPost($content: String!) {
        createPost(content: $content) {
            id
            content
            createdAt
            updatedAt
            username
            comments {
                id
                content
                createdAt
                username
            }
            likes {
                username
            }
        }
    }
`;

const DELETE_POST = gql`
    mutation deletePost($id: String!) {
        deletePost(id: $id)
    }
`;

const LIKE_POST = gql`
    mutation likePost($id: String!) {
        likePost(id: $id) {
            id
            content
            username
            likes {
                username
            }
        }
    }
`;

const CREATE_COMMENT = gql`
    mutation createComment($id: String! $content: String!) {
        createComment(id: $id content: $content) {
            id
            content
            createdAt
            updatedAt
            username
            comments {
                id
                content
                createdAt
                username
            }
            likes {
                username
            }
        }
    }
`;

const DELETE_COMMENT = gql`
    mutation deleteComment($id: String! $commentId: String!) {
        deleteComment(id: $id commentId: $commentId)
    }
`;

export {
    LOGIN_USER,
    REGISTER_USER,
    CREATE_POST,
    DELETE_POST,
    LIKE_POST,
    DELETE_COMMENT,
    CREATE_COMMENT
};