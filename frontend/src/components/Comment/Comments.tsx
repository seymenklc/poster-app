import { CommentType } from "@/types";
import Comment from "./Comment";

type Props = {
    comments: CommentType[];
    postId: string;
};

export default function Comments({ comments, postId }: Props) {
    return (
        <>
            {comments.map(comment => (
                <Comment
                    key={comment.id}
                    postId={postId}
                    comment={comment}
                />
            ))}
        </>
    );
}