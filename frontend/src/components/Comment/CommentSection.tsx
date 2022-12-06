import { usePagination } from "@/hooks/usePagination";
import { PostType } from "@/types";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import Pagination from "@/components/Pagination";

type Props = {
    post: PostType;
    focusInput: boolean;
};

export default function CommentSection({ post, focusInput }: Props) {
    const { currentItems, pageNums, paginate } = usePagination(post.comments, 2);

    return (
        <div className="flex-1 p-3 flex flex-col gap-4">
            <CommentInput postId={post.id} focusInput={focusInput} />
            <Comments comments={currentItems} postId={post.id} />
            <div className="p-1">
                <Pagination pageNums={pageNums} paginate={paginate} />
            </div>
        </div>
    );
}