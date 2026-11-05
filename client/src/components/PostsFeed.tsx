import usePosts from "../hooks/usePosts";
import PostCard from "./PostCard";

export default function PostsFeed() {
    const {data: posts, isLoading, error} = usePosts();

    return (
        <main className="w-full max-w-[800px] mx-auto p-4 space-y-4">
            {isLoading
                ? <p className="border rounded-lg p-4 bg-[var(--common-card)] border-[var(--common-border)] text-[var(--common-text-secondary)]">
                    Loading...
                </p>
                : error
                ? <p className="border rounded-lg p-4 bg-[var(--common-card)] border-[var(--common-border)] text-[var(--common-text-secondary)]">
                    Could not load posts.
                </p>
                : posts?.length === 0
                ? <p className="border rounded-lg p-4 bg-[var(--common-card)] border-[var(--common-border)] text-[var(--common-text-secondary)]">
                    No posts published.
                </p>
                : posts?.map(post => (
                    <PostCard post={post} key={post.id}/>
                ))
            }
        </main>
    );
}