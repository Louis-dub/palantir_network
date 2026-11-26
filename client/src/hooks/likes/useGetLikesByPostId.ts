import { useQuery } from "@tanstack/react-query";
import { getLikesByUserId } from "../../api/likes";

export default function useGetLikesByPostId(postId: number | undefined) {
    return useQuery({
        queryKey: ["likes", postId],
        queryFn: () => getLikesByUserId(postId),
        enabled: postId !== undefined,
    });
}
