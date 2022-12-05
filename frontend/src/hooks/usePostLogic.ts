import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostType } from "@/types";
import { useAuth } from "./useAuth";

type Params = {
    post?: PostType;
    likePost: () => void;
    deletePost?: () => void;
};

export const usePostLogic = ({ post, likePost, deletePost }: Params) => {
    const [liked, setLiked] = useState(false);

    const { auth } = useAuth();
    const navigate = useNavigate();

    const isAuthenticated = () => {
        if (!auth.username) {
            navigate('auth/login');
            return false;
        }
        return true;
    };

    const handleDelete = () => {
        if (isAuthenticated() && deletePost) {
            deletePost();
            navigate('/');
        }
    };

    const handleLike = () => {
        if (isAuthenticated()) {
            likePost();
        }
    };

    useEffect(() => {
        const isLiked = post?.likes.find(el => {
            return el.username === auth?.username;
        });

        isLiked ? setLiked(true) : setLiked(false);

    }, [post?.likes, likePost]);

    return { liked, handleLike, handleDelete };
};