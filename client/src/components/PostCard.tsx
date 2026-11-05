import type { Post } from "../api/posts";

type PostCardProps = {
    post: Post;
};

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="flex flex-col items-center gap-4 w-[800px]">
            <h2 className="text-2xl font-bold">{post.username}</h2>
            <p>{post.content}</p>
        </article>
    )
}