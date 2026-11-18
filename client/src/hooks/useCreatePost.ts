import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostApi } from "../api/posts";

export default function useCreatePostApi() {
    const queryKey = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: createPostApi,
        onSuccess: () => queryKey.invalidateQueries({ queryKey: ["posts"] }),
    });
}