import { PostType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

type Params = {
    post?: PostType;
    likePost: () => void;
};

export const usePostLogic = ({ post, likePost }: Params) => {
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

    const handleLike = () => {
        if (isAuthenticated()) {
            likePost();
        }
    };

    useEffect(() => {
        const isLiked = post?.likes.find(el => {
            return el.username === post?.username;
        });

        isLiked ? setLiked(true) : setLiked(false);

    }, [post?.likes, likePost]);

    return { liked, handleLike, };
};