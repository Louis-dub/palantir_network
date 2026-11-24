import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../api/comments";

export default function useDeleteComment() {
    const queryKey = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: deleteComment,
        onSuccess: (_data, id) => {
            queryKey.invalidateQueries({ queryKey: ["posts"] });
            queryKey.removeQueries({ queryKey: ["posts", id] });
        }
    });
}
