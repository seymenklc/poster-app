import Posts from "@/components/Posts";
import Create from "@/components/Create";

export default function Home() {
    return (
        <div className="h-full container mx-auto py-5 max-w-3xl">
            <Create />
            <Posts />
        </div>
    );
}