import { useQuery } from "@tanstack/react-query";
import { getLikesByPostId } from "../../api/likes";

export default function useGetLikesByPostId(postId: number | undefined) {
    return useQuery({
        queryKey: ["likes", postId],
        queryFn: () => getLikesByPostId(postId),
        enabled: postId !== undefined,
    });
}
