import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/posts";

export default function usePosts(id: number) {
    return useQuery({
        queryKey: ["posts", id],
        queryFn: getPosts,
    })
}
