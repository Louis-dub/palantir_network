import { GiScrollUnfurled } from "react-icons/gi";

type CommentProps = {
    postId: number;
    isPostUser: boolean;
}

export default function Comments({ postId, isPostUser }: CommentProps) {
    return (
        <>
            {!isPostUser && (
                <button
                    className="hover:scale-110 active:scale-95 transition-all ease-out"
                >
                    <GiScrollUnfurled size={24} />
                </button>
            )}
        </>
    );
}
