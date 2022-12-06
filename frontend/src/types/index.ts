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

type PostQueryType = { getPost: PostType; } & QueryResult;
type PostsQueryType = { getPosts: PostType[]; } & QueryResult;

// context //
type UserType = {
    id?: string;
    email?: string;
    username?: string;
    token?: string;
};

type Like = {
    username: string;
};

type CommentType = {
    id: string;
    content: string;
    createdAt: Date;
    username: string;
};

type PostType = {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt?: any;
    username: string;
    comments: CommentType[];
    likes: Like[];
};

type AuthType = {
    ready: boolean;
    auth: UserType;
    setAuth: Dispatch<SetStateAction<{}>>;
};

export type {
    UserMutationType,
    PostMutationType,
    PostsQueryType,
    PostQueryType,
    CommentType,
    UserType,
    AuthType,
    PostType
};