import type { Post } from "../api/posts";

type PostCardProps = {
    post: Post;
};

export default function PostCard({ post }: PostCardProps) {
    return (
        <article
            className="flex flex-col items-start p-4 gap-4 w-full bg-[var(--common-card)] text-[var(--common-text-primary)] border-2 border-[var(--common-border)]"
        >
            <h2 className="text-2xl font-bold">{post.username}</h2>
            <p>{post.content}</p>
        </article>
    )
}