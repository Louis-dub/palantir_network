import type { Post } from "../api/posts";
import { FaThumbsUp, FaComment, FaShareNodes } from "react-icons/fa6";

type PostCardProps = {
    post: Post;
};

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="flex flex-col items-center gap-4 w-[800px]">
            <h2 className="text-2xl font-bold">{post.username}</h2>
            <p>{post.content}</p>
            <ul>
                <li>
                    <button
                        className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out"
                    >
                        <FaThumbsUp />
                    </button>
                </li>
                <li>
                    <button
                        className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out"
                    >
                        <FaComment />
                    </button>
                </li>
                <li>
                    <button
                        className="cursor-pointer hover:scale-110 active:scale-95 transition-all ease-out"
                    >
                        <FaShareNodes />
                    </button>
                </li>
            </ul>
        </article>
    )
}