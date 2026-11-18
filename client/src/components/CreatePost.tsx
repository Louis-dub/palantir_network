import { useState, type SubmitEvent } from "react";
import useCreatePostApi from "../hooks/useCreatePost";
import { FaEye } from "react-icons/fa";

export default function CreatePost() {
    const [content, setContent] = useState<string>("");
    const create = useCreatePostApi();

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        create.mutate(content);
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <h1>New Post</h1>
                <textarea
                    className="resize-none"
                    placeholder="Write here..."
                    maxLength={256}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                {create.error && (
                    <p>Your message is too long for The Palantír.</p>
                )}
                <button
                    type="submit"
                    disabled={create.isPending}
                >
                    {create.isPending ? "The Palantír is listening..." : "Send"}
                    <FaEye />
                </button>
            </form>
        </div>
    );
}