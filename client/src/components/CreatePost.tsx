import { useEffect, useState, type SubmitEvent } from "react";
import useCreatePostApi from "../hooks/useCreatePost";
import { FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function CreatePost() {
    const [content, setContent] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const create = useCreatePostApi();

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        create.mutate(content, {
            onSuccess: () => {
                setContent("");
                setIsOpen(false);
            }
        });
    }

    useEffect(() => {
        const dialog = document.getElementById("create-post") as HTMLDialogElement;

        if (isOpen)
            dialog.showModal();
        else
            dialog.close();
    }, [isOpen]);

    return (
        <section className="w-[100%]">
            <button
                type="button"
                onClick={() => {
                    create.reset();
                    setIsOpen(true);
                }}
                className="m-auto flex w-fit items-center gap-2 rounded-xl bg-[var(--common-accent)] px-5 py-3 font-semibold text-[var(--common-background)] shadow-lg transition hover:brightness-110 active:scale-[0.98]"
            >
                Add Vision
                <FaEye aria-hidden="true" />
            </button>

            <dialog
                id="create-post"
                aria-labelledby="create-post-title"
                className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-[var(--common-border)] bg-[var(--common-card)] p-0 text-[var(--common-text-primary)] shadow-[0_0_60px_rgba(0,0,0,0.55)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
            >
                <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 id="create-post-title" className="mt-2 text-2xl font-semibold">
                                New Post
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

                    <div className="space-y-2">
                        <label htmlFor="post-content" className="block text-sm font-medium text-[var(--common-text-secondary)]">
                            Your vision
                        </label>
                        <textarea
                            id="post-content"
                            name="content"
                            className="min-h-36 w-full resize-none rounded-xl border border-[var(--common-border)] bg-[var(--common-background)] px-4 py-3 text-[var(--common-text-primary)] placeholder:text-[var(--common-text-secondary)]"
                            placeholder="Write here..."
                            maxLength={256}
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            required
                        />
                        <p className="text-right text-xs text-[var(--common-text-secondary)]">
                            {content.length}/256
                        </p>
                    </div>

                    {create.error && (
                        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500" role="alert">
                            {create.error.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={create.isPending || content.trim().length === 0}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--common-accent)] px-4 py-3 font-semibold text-[var(--common-background)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {create.isPending ? "The Palantír is listening..." : "Send"}
                        <FaEye aria-hidden="true" />
                    </button>
                </form>
            </dialog>
        </section>
    );
}