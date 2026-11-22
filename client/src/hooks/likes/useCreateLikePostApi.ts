import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLikePostApi } from "../../api/likes";

export default function useCreateLikePostApi() {
    const queryKey = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: createLikePostApi,
        onSuccess: () => queryKey.invalidateQueries({ queryKey: ["likes"]}),
    });
}
