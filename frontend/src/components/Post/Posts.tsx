import { GET_POSTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { usePagination } from "@/hooks/usePagination";
import { PostsQueryType, PostType } from "@/types";

import Post from "@/components/Post/Post";
import Pagination from "@/components/Pagination";
import PostSkeleton from "@/components/Post/PostSkeleton";

export default function Posts() {
    const { data, loading, error } = useQuery<PostsQueryType>(GET_POSTS);
    const { currentItems, pageNums, paginate } = usePagination(data?.getPosts, 6);

    return (
        <section className="h-full flex flex-col justify-between">
            {error && <p className="error">{error.message}</p>}
            {(!data?.getPosts.length && !loading && !error) && <h2>No post here yet!</h2>}
            <div className="post-grid">
                {loading && <PostSkeleton count={6} />}
                {data && currentItems.map((item: PostType) => (
                    <Post key={item.id} item={item} />
                ))}
            </div>
            {!loading && (
                <div className="mb-24 flex justify-center">
                    <Pagination pageNums={pageNums} paginate={paginate} />
                </div>
            )}
        </section>
    );
};