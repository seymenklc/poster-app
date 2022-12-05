import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { MdFavoriteBorder, MdOutlineModeComment, MdOutlineMore, MdFavorite } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";
import { PostType } from "@/types";
import { usePostLogic } from "@/hooks/usePostLogic";

type Props = {
    post: PostType | undefined;
    likePost?: () => any;
};

export default function PostBottom({ likePost, post }: Props) {


    return (
        <div className='flex justify-between items-center p-1'>
            <div className='flex items-center gap-4'>
                <span onClick={handleLike} className='post-icon hover:text-rose-500'>
                    {liked ? (
                        <span className='text-rose-500'>
                            <MdFavorite />
                        </span>
                    ) : <MdFavoriteBorder />}
                </span>
                <Link to={`post/${post?.id}`} className='post-icon hover:text-sky-500'>
                    <MdOutlineModeComment />
                </Link>
            </div>
            <Link to={`post/${post?.id}`} className='post-icon hover:text-[#12b488]'>
                <MdOutlineMore />
            </Link>
        </div>
    );
}