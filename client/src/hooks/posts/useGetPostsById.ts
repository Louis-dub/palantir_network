import { useQuery } from "@tanstack/react-query";
import { getPostsById } from "../../api/posts";

export default function useGetPostsById(postId: number | undefined) {
    return useQuery({
        queryKey: ["posts", postId],
        queryFn: () =>  getPostsById(postId),
        enabled: postId !== undefined,
    });
}
