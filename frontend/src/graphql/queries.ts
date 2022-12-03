import { gql } from '@apollo/client';

const GET_POSTS = gql`
    query getPosts {
        getPosts {
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

const GET_POST = gql`
    query getPost($id: String!) {
        getPost(id: $id) {
            id
            content
            username
            createdAt
            updatedAt
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

export { GET_POSTS, GET_POST };