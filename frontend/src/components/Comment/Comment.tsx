import { DELETE_COMMENT } from "@/graphql/mutations";
import { GET_POSTS } from "@/graphql/queries";
import { useAuth } from "@/hooks/useAuth";
import { CommentType } from "@/types";
import { useMutation } from "@apollo/client";
import moment from "moment";
import { MdDeleteOutline } from "react-icons/md";


type Props = {
    comment: CommentType;
    postId: string;
};

export default function Comment({ comment, postId }: Props) {
    const { auth } = useAuth();

    const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
        variables: { id: postId, commentId: comment.id },
        refetchQueries: [{ query: GET_POSTS }, 'getPosts'],
    });

    const handleDelete = () => deleteComment();

    return (
        <div className={`p-2 flex flex-col border border-slate-300 rounded-md ${loading && 'opacity-40'}`}>
            <div className="flex justify-between items-center border-b border-slate-300 py-2">
                <span className="text-lg text-[#12b488] opacity-80">
                    {comment.username}
                </span>
                <div className="flex items-center gap-2">
                    <small className="text-gray-400">
                        {moment(comment.createdAt).fromNow()}
                    </small>
                    {auth.username === comment.username && (
                        <span className="post-icon hover:text-rose-500" onClick={handleDelete}>
                            <MdDeleteOutline />
                        </span>
                    )}
                </div>
            </div>
            <p className="p-1 mt-1 flex-1 text-justify text-sm text-gray-700 break-all">
                {comment.content}
            </p>
        </div>
    );
}