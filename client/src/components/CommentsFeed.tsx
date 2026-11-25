import { useEffect, useState, type SubmitEvent } from "react";
import { GiScrollQuill, GiScrollUnfurled } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import useCreateComment from "../hooks/comments/useCreateComment";
import useGetCommentsByPostId from "../hooks/comments/useGetPostsByPostId";
import CommentCard from "./CommentCard";

type CommentProps = {
    postId: number;
    userId: number;
    isPostUser: boolean;
}

export default function CommentsFeed({ postId, userId, isPostUser }: CommentProps) {
    const [content, setContent] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {data: comments, isLoading, error} = useGetCommentsByPostId(postId);
    const create = useCreateComment();

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        create.mutate({postId, content}, {
            onSuccess: () => setContent("")
        });
    }

    useEffect(() => {
        const dialog = document.getElementById(`comments-${postId}`) as HTMLDialogElement;

        if (isOpen)
            dialog.showModal();
        else
            dialog.close();
    }, [isOpen]);

    return (
        <>
            <button
                className="hover:scale-110 active:scale-95 transition-all ease-out"
                onClick={() => setIsOpen(true)}
            >
                <GiScrollUnfurled size={24} />
            </button>

            <dialog
                id={`comments-${postId}`}
                aria-labelledby="create-comments-title"
                className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-[var(--common-border)] bg-[var(--common-card)] p-0 text-[var(--common-text-primary)] shadow-[0_0_60px_rgba(0,0,0,0.55)] backdrop:bg-black/70 backdrop:backdrop-blur-sm space-y-5 p-5 sm:p-7"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 id="create-post-title" className="mt-2 text-2xl font-semibold">
                                                                                               Comments
                        </h2>
                    </div>
                    <button
                        type="button"
                        aria-label="Close dialog"
                        onClick={() => setIsOpen(false)}
                        disabled={create.isPending}
                        className="rounded-full p-2 text-[var(--common-text-secondary)] transition hover:bg-[var(--common-background)] hover:text-[var(--common-text-primary)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RxCross2 size={20} aria-hidden="true" />
                    </button>
                </div>
                {!isPostUser && (
                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <textarea
                                id={`comment-${postId}-content`}
                                name="content"
                                className="min-h-28 w-full resize-none rounded-xl border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-[var(--common-text-primary)] placeholder:text-[var(--common-text-secondary)]"
                                placeholder="Write here..."
                                maxLength={128}
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-[10px] bottom-[32px] hover:scale-110 active:scale-95 transition-all ease-out"
                            >
                                <GiScrollQuill size={24} />
                            </button>
                            <p className="text-right text-xs text-[var(--common-text-secondary)]">
                                {content.length}/128
                            </p>
                        </div>
                    </form>
                )}
                {isLoading
                    ? <p className="border rounded-lg p-4 bg-[var(--common-card)] border-[var(--common-border)] text-[var(--common-text-secondary)]">
                                                                                                                                                         Loading...
                      </p>
                    : error
                    ? <p className="border rounded-lg p-4 bg-[var(--common-card)] border-[var(--common-border)] text-[var(--common-text-secondary)]">
                                                                                                                                                         Could not load comments.
                      </p>
                    : comments?.length === 0
                    ? <p className="border rounded-lg p-4 bg-[var(--common-card)] border-[var(--common-border)] text-[var(--common-text-secondary)]">
                                                                                                                                                         No comments published.
                      </p>
                    : comments?.map(comment => (
                        <CommentCard
                            comment={comment}
                            btnDelete={comment.user_id === userId}
                            key={comment.id}
                        />
                    ))
                }
            </dialog>
        </>
    );
}
