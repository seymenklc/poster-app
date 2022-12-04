import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostType } from "@/types";
import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@apollo/client';
import { LIKE_POST } from '@/graphql/mutations';
import { MdFavoriteBorder, MdOutlineModeComment, MdOutlineMore, MdFavorite } from "react-icons/md";

export default function Post({ item }: { item: PostType; }) {
    const [liked, setLiked] = useState(false);

    const { auth } = useAuth();
    const navigate = useNavigate();

    const [likePost] = useMutation(LIKE_POST, {
        variables: { id: item.id },
    });

    const isAuthenticated = () => {
        if (!auth.username) {
            navigate('auth/login');
            return false;
        }
        return true;
    };

    const handleLike = async () => {
        if (isAuthenticated()) {
            await likePost();
        }
    };

    useEffect(() => {
        const isLiked = item.likes.find(el => {
            return el.username === item.username;
        });

        isLiked ? setLiked(false) : setLiked(true);

    }, [item.likes, likePost]);

    return (
        <div className="bg-neutral-50 flex flex-col w-full h-52 p-3 rounded-md shadow-sm">
            <div className='p-1 flex justify-between items-center border-b border-slate-300'>
                <span className='font-semibold text-[#12b488] opacity-80'>
                    {item.username}
                </span>
                <small className='text-gray-400'>
                    {moment(item.createdAt).fromNow()}
                </small>
            </div>
            <p className='p-1 mt-1 flex-1 text-justify text-sm'>{item.content}</p>
            <div className='flex justify-between items-center p-1'>
                <div className='flex items-center gap-4'>
                    <span onClick={handleLike} className='post-icon hover:text-rose-500'>
                        {liked ? (
                            <span className='text-rose-500'>
                                <MdFavorite />
                            </span>
                        ) : <MdFavoriteBorder />}
                    </span>
                    <Link to={`post/${item.id}`} className='post-icon hover:text-sky-500'>
                        <MdOutlineModeComment />
                    </Link>
                </div>
                <Link to={`post/${item.id}`} className='post-icon hover:text-[#12b488]'>
                    <MdOutlineMore />
                </Link>
            </div>
        </div>
    );
}