import { QueryResult } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";

enum UserActions {
    createUser = 'createUser',
    loginUser = 'loginUser'
}

type UserMutationType = {
    [UserActions.createUser]: UserType;
    [UserActions.loginUser]: UserType;
};

type PostMutationType = {
    createPost: PostType;
};

type PostsQueryType = { getPosts: PostType[]; } & QueryResult;

// context //
type UserType = {
    id?: string;
    email?: string;
    username?: string;
    token?: string;
};

type PostType = {
    __typename: string;
    id: string;
    content: string;
    createdAt: Date;
    updatedAt?: any;
    username: string;
    comments: any[];
    likes: any[];
};

type AuthType = {
    auth: UserType;
    setAuth: Dispatch<SetStateAction<{}>>;
};

export type {
    UserMutationType,
    PostMutationType,
    PostsQueryType,
    UserType,
    AuthType,
    PostType
};