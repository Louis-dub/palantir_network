import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi } from "../api/posts";

export default function useDeletePostApi() {
    const queryKey = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: deletePostApi,
        onSuccess: (_data, id) => {
            queryKey.invalidateQueries({ queryKey: ["posts"] });
            queryKey.removeQueries({ queryKey: ["posts", id] });
        },
    });
}
