import { FaEyeSlash } from "react-icons/fa";
import type { Comment } from "../api/comments"
import useDeleteComment from "../hooks/comments/useDeleteComment";

type CommentCardProps = {
    comment: Comment;
    btnDelete: boolean;
}

export default function CommentCard({ comment, btnDelete }: CommentCardProps) {
    const {mutate: deleteComment} = useDeleteComment();

    function handleClick() {
        deleteComment(comment.id);
    }

    return (
        <article
            className="flex flex-col items-start p-4 gap-4 w-full bg-[var(--common-card)] text-[var(--common-text-primary)] border-2 border-[var(--common-border)] rounded-[15px]"
        >
            <div className="flex justify-between items-center w-[100%]">
                <h2 className="text-2xl font-bold">{comment.username}</h2>
                {btnDelete && (
                    <button
                        className="hover:scale-110 active:scale-95 transition-all ease-out"
                        onClick={handleClick}
                    >
                        <FaEyeSlash size={24} />
                    </button>
                )}
            </div>
            <div className="flex justify-between items-center w-[100%]">
                <p>{comment.content}</p>
            </div>
        </article>
    );
}
