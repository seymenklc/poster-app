import { GET_POSTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { usePagination } from "@/hooks/usePagination";
import { PostsQueryType, PostType } from "@/types";

import Post from "@/components/Post";
import Pagination from "@/components/Pagination";
import PostSkeleton from "@/components/PostSkeleton";

export default function Posts() {
    const { data, loading, error } = useQuery<PostsQueryType>(GET_POSTS);
    const { currentItems, pageNums, paginate } = usePagination(data?.getPosts, 6);

    return (
        <section>
            {error && <p>{error.message}</p>}
            <div className="post-grid">
                {loading && <PostSkeleton count={6} />}
                {data && currentItems.map((item: PostType) => (
                    <Post key={item.id} item={item} />
                ))}
            </div>
            {!loading && (
                <div className="my-6 flex justify-center">
                    <Pagination pageNums={pageNums} paginate={paginate} />
                </div>
            )}
        </section>
    );
};