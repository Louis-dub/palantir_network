import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLikePostApi } from "../../api/likes";

export default function useDeleteLikePostApi() {
    const queryKey = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: deleteLikePostApi,
        onSuccess: (_data, id) => {
            queryKey.invalidateQueries({ queryKey: ["likes"] });
            queryKey.removeQueries({ queryKey: ["likes", id] });
        },
    });
}
