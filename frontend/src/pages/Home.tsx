import Create from "@/components/Create";
import Posts from "@/components/Posts";
import PostSkeleton from "@/components/PostSkeleton";

export default function Home() {
    return (
        <div className="h-full container mx-auto py-5 max-w-3xl">
            <Create />
            <Posts />
        </div>
    );
}