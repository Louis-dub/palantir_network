import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, type CreateComment } from "../../api/comments";

export default function useCreateComment() {
    const queryKey = useQueryClient();

    return useMutation<void, Error, CreateComment>({
        mutationFn: createComment,
        onSuccess: () => queryKey.invalidateQueries({ queryKey: ["comments"] }),
    });
} 
