import moment from 'moment';
import { Link } from 'react-router-dom';
import { PostType } from "@/types";
import { useMutation } from '@apollo/client';
import { LIKE_POST } from '@/graphql/mutations';
import { MdFavoriteBorder, MdOutlineModeComment, MdOutlineMore, MdFavorite } from "react-icons/md";
import { usePostLogic } from '@/hooks/usePostLogic';

export default function Post({ item }: { item: PostType; }) {
    const [likePost] = useMutation(LIKE_POST, {
        variables: { id: item.id },
    });

    const { liked, handleLike } = usePostLogic({ likePost, post: item });

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
                    <span
                        onClick={handleLike}
                        className='post-icon hover:text-rose-500 flex items-center'
                    >
                        {liked ? (
                            <span className='text-rose-500'>
                                <MdFavorite />
                            </span>
                        ) : <MdFavoriteBorder />}&nbsp;{item?.likes.length}
                    </span>
                    <Link
                        to={`post/${item.id}`}
                        className='post-icon hover:text-sky-500 flex items-center'
                    >
                        <MdOutlineModeComment />&nbsp;{item?.comments.length}
                    </Link>
                </div>
                <Link to={`post/${item.id}`} className='post-icon hover:text-[#12b488]'>
                    <MdOutlineMore />
                </Link>
            </div>
        </div>
    );
}