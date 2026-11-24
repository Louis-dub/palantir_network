import { useQuery } from "@tanstack/react-query";
import { getCommentsByPostId } from "../../api/comments";

export default function useGetCommentsByPostId(postId: number | undefined) {
    return useQuery({
        queryKey: ["comments", postId],
        queryFn: () => getCommentsByPostId(postId),
        enabled: postId !== undefined,
    });
}
