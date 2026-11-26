import { FaEyeSlash, FaRegStar, FaStar } from "react-icons/fa";
import type { Post } from "../api/posts";
import useDeletePostApi from "../hooks/posts/useDeletePost";
import { useState } from "react";
import useCreateLikePostApi from "../hooks/likes/useCreateLikePostApi";
import useDeleteLikePostApi from "../hooks/likes/useDeleteLikePostApi";
import CommentsFeed from "./CommentsFeed";
import useGetLikesByPostId from "../hooks/likes/useGetLikesByPostId";

type PostCardProps = {
    post: Post;
    btnDelete: boolean;
    userId: number;
};

export default function PostCard({ post, btnDelete, userId }: PostCardProps) {
    const {mutate: deletePost} = useDeletePostApi();
    const {mutate: createLike} = useCreateLikePostApi();
    const {mutate: deleteLike} = useDeleteLikePostApi();
    const {data: likes, isLoading, error} = useGetLikesByPostId(post.id);
    const [like, setLike] = useState<boolean>(isLoading ? false : error ? false : likes.find(l => l.user_id === userId) !== undefined);

    function handleClickEye() {
        deletePost(post.id);
    }

    function handeClickStar() {
        if (like) {
            deleteLike(post.id);
            setLike(false);
        } else {
            createLike(post.id);
            setLike(true);
        }
            
    }

    return (
        <article
            className="flex flex-col items-start p-4 gap-4 w-full bg-[var(--common-card)] text-[var(--common-text-primary)] border-2 border-[var(--common-border)] rounded-[15px]"
        >
            <div className="flex justify-between items-center w-[100%]">
                <h2 className="text-2xl font-bold">{post.username}</h2>
                {btnDelete && (
                    <button
                        className="hover:scale-110 active:scale-95 transition-all ease-out"
                        onClick={handleClickEye}
                    >
                        <FaEyeSlash size={24} />
                    </button>
                )}
            </div>
            <div className="flex justify-between items-center w-[100%]">
                <p>{post.content}</p>
                <div className="flex justify-center gap-6">
                    <CommentsFeed
                        postId={post.id}
                        isPostUser={btnDelete}
                        userId={userId}
                    />
                    <div className="flex justify-center gap-2 items-center">
                        {!isLoading && !error && <p>{likes.length}</p>}
                        <button
                            className="hover:scale-110 active:scale-95 transition-all ease-out"
                            onClick={handeClickStar}
                        >
                            {!like
                                ? <FaRegStar size={24} />
                                : <FaStar size={24} /> 
                            }
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}
