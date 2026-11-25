import { useAuth } from "../contexts/useAuth";
import useGetLikesByUserId from "../hooks/likes/useGetLikesByUserId";
import useGetPostsById from "../hooks/posts/useGetPostsById";
import usePosts from "../hooks/posts/usePosts";
import PostCard from "./PostCard";

function PostsFeed({posts, isLoadingPosts, error}) {
    const {user} = useAuth();
    const {data: likes = [], isLoading: isLoadingLikes} = useGetLikesByUserId(user?.id);

    return (
        <section className="w-full mx-auto p-4 space-y-4">
            {isLoadingPosts || isLoadingLikes || !user
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
                    <PostCard
                        post={post}
                        btnDelete={post.author_id === user.id}
                        btnLike={likes.find(like => like.post_id === post.id) !== undefined}
                        userId={user.id}
                        key={post.id}
                    />
                ))
            }
        </section>
    );
}

export function PostsAll() {
    const {data: posts, isLoading, error} = usePosts();
    return <PostsFeed posts={posts} isLoadingPosts={isLoading} error={error} />;
}

export function PostsByUsername({ userId }: { userId: number }) {
    const {data: posts, isLoading, error} = useGetPostsById(userId);
    return <PostsFeed posts={posts} isLoadingPosts={isLoading} error={error} />;
}
