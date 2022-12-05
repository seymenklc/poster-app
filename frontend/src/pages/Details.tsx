import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { usePostLogic } from "@/hooks/usePostLogic";

import Spinner from "@/components/Spinner";
import CommentInput from "@/components/CommentInput";

import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_POST, LIKE_POST } from "@/graphql/mutations";
import { GET_POST, GET_POSTS } from "@/graphql/queries";
import { PostQueryType } from "@/types";

import { MdFavoriteBorder, MdOutlineModeComment, MdFavorite, MdDeleteOutline } from "react-icons/md";

export default function Details() {
    const [error, setError] = useState('');
    const [focusInput, setFocusInput] = useState(false);

    const params = useParams();
    const { auth } = useAuth();

    const [fetchPost, { data, loading }] = useLazyQuery<PostQueryType>(GET_POST, {
        variables: { id: params?.id },
        onError: (err) => {
            setError(err.graphQLErrors[0]?.message);
        }
    });
    const post = data?.getPost;

    const [deletePost] = useMutation(DELETE_POST, {
        variables: { id: data?.getPost.id },
        refetchQueries: [{ query: GET_POSTS }, 'getPosts'],
        onError: (err) => {
            setError(err.graphQLErrors[0]?.message);
        },
    });

    const [likePost] = useMutation(LIKE_POST, {
        variables: { id: data?.getPost.id },
    });

    const { liked, handleLike, handleDelete } = usePostLogic({
        post, likePost, deletePost
    });

    const handleFocus = () => {
        setFocusInput(!focusInput);
    };

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <>
            {error && <p className="error">{error}</p>}
            {loading && <Spinner />}
            {post && (
                <article className="mx-auto max-w-3xl h-full p-5 flex flex-col">
                    <div className="flex justify-between items-center border-b border-slate-300 p-4">
                        <h2 className="font-semibold text-xl text-[#12b488] opacity-80">
                            {post.username.toUpperCase()}
                        </h2>
                        <span className="text-gray-400">{moment(post.createdAt).fromNow()}</span>
                    </div>
                    <p className='p-4 flex-1 text-justify text-gray-700 max-h-[300px]'>
                        {post.content}
                    </p>
                    <div className='flex items-center gap-5 p-5'>
                        <span
                            onClick={handleLike}
                            className='post-icon scale-[1.50] hover:text-rose-500 flex items-center'
                        >
                            {liked ? (
                                <span className='text-rose-500'>
                                    <MdFavorite />
                                </span>
                            ) : <MdFavoriteBorder />}&nbsp;{post.likes.length}
                        </span>
                        <button
                            onClick={handleFocus}
                            className='post-icon scale-[1.50] hover:text-sky-500 flex items-center'
                        >
                            <MdOutlineModeComment />&nbsp;{post.comments.length}
                        </button>
                        {post.username === auth.username && (
                            <button
                                onClick={handleDelete}
                                className="ml-auto post-icon scale-[1.50] hover:text-red-600"
                            >
                                <MdDeleteOutline />
                            </button>
                        )}
                    </div>
                    <div className="flex-1 p-3">
                        <CommentInput
                            postId={post.id}
                            focusInput={focusInput}
                        />
                    </div>
                </article>
            )}
        </>
    );
}