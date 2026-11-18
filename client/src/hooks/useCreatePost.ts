import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";

export default function useCreatePost() {
    const queryKey = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: createPost,
        onSuccess: () => queryKey.invalidateQueries({ queryKey: ["posts"] }),
    });
}