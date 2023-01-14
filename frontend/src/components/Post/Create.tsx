import { useState } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/graphql/mutations";
import { GET_POSTS } from "@/graphql/queries";

import { PostMutationType } from "@/types";

import { useForm } from "@/hooks/useForm";
import { useAuth } from "@/hooks/useAuth";

export default function Create() {
    const [error, setError] = useState('');
    const { auth } = useAuth();

    const { values, onChange, onSubmit } = useForm(createPost, { content: '' });

    const [addPost, { loading }] = useMutation<PostMutationType>(CREATE_POST, {
        variables: values,
        update: (cache, { data }) => {
            const current: any = cache.readQuery({ query: GET_POSTS });

            cache.writeQuery({
                query: GET_POSTS,
                data: {
                    getPosts: [...current?.getPosts, data?.createPost]
                }
            });
        },
        onError: (err) => {
            setError(err.graphQLErrors[0]?.message);
        },
    });

    async function createPost() {
        if (auth.username) {
            await addPost();
        } else {
            setError('You must be logged in to post!');
        }
    }

    return (
        <form onSubmit={onSubmit} autoCorrect='off'>
            <div className="flex justify-center">
                <input
                    type="search"
                    className="block md:w-full p-4 text-md text-gray-900 w-3/4
                    border outline-none rounded-lg bg-gray-50 focus:border-[#12b488]"
                    placeholder="Have you guys heard about..."
                    name='content'
                    value={values.content}
                    onChange={onChange}
                />
                <button
                    type="submit"
                    className="btn -ml-14 disabled:bg-gray-300"
                    disabled={loading}
                >
                    Post
                </button>
            </div>
            {error && <p className="error text-center mt-3">{error}</p>}
        </form>
    );
}