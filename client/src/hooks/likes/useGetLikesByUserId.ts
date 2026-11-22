import { useQuery } from "@tanstack/react-query";
import { getLikesByUserId } from "../../api/likes";

export default function useGetLikesByUserId(userId: number) {
    return useQuery({
        queryKey: ["likes", userId],
        queryFn: () => getLikesByUserId(userId),
    });
}
