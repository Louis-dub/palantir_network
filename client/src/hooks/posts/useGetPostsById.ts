import { useQuery } from "@tanstack/react-query";
import { getPostsById } from "../../api/posts";

export default function useGetPostsById(id: number) {
    return useQuery({
        queryKey: ["posts", id],
        queryFn: () => getPostsById(id),
    })
}
