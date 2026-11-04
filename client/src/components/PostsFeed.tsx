import usePosts from "../hooks/usePosts";
import PostCard from "./PostCard";

export default function PostsFeed() {
    const {data: posts, isLoading, error} = usePosts();

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : error
                ? <p>Could not load posts.</p>
                : posts?.map(post => (
                    <PostCard post={post} key={post.id}/>
                ))
            }
        </>
    );
}