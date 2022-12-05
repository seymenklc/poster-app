import { useState, useRef, useEffect } from 'react';
import { useForm } from "@/hooks/useForm";
import { useMutation } from '@apollo/client';
import { GET_POSTS } from '@/graphql/queries';
import { CREATE_COMMENT } from '@/graphql/mutations';

type Props = {
    postId?: string;
    focusInput: boolean;
};

export default function CommentInput({ postId, focusInput }: Props) {
    const [error, setErorr] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const { values, onChange, onSubmit } = useForm(addComment, { content: '' });

    const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
        variables: { id: postId, content: values.content },
        // update: (cache, { data }) => {
        //     const current = cache.readQuery({
        //         query: GET_POSTS
        //     });
        //     console.log(current);
        //     cache.writeQuery({
        //         query: GET_POSTS,
        //         data: {
        //             getPosts: [...current.getPosts, data.createComment]
        //         }
        //     });
        // },
        refetchQueries: [
            { query: GET_POSTS },
            'getPosts'
        ],
        onError: (err) => {
            setErorr(err.graphQLErrors[0]?.message);
        }
    });

    async function addComment() {
        await createComment();
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [focusInput]);

    return (
        <form autoCapitalize='off' onSubmit={onSubmit}>
            <div className='flex flex-col gap-2'>
                <input
                    type="text"
                    className='form-input mb-0'
                    placeholder='this is awesome!'
                    ref={inputRef}
                    onChange={onChange}
                    value={values.content}
                />
                <button className='form-btn mt-0 p-2'>Comment</button>
            </div>
        </form>
    );
}