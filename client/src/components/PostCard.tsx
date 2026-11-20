import { FaEyeSlash } from "react-icons/fa";
import type { Post } from "../api/posts";

type PostCardProps = {
    post: Post;
    btnDelete: boolean;
};

export default function PostCard({ post, btnDelete }: PostCardProps) {
    return (
        <article
            className="flex flex-col items-start p-4 gap-4 w-full bg-[var(--common-card)] text-[var(--common-text-primary)] border-2 border-[var(--common-border)] rounded-[15px]"
        >
            <div className="flex justify-between items-center w-[100%]">
                <h2 className="text-2xl font-bold">{post.username}</h2>
                {btnDelete && (
                    <button className="hover:scale-110 active:scale-95 transition-all ease-out">
                        <FaEyeSlash size={24} />
                    </button>
                )}
            </div>
            <p>{post.content}</p>
        </article>
    )
}
