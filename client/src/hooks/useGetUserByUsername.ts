import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "../api/auth";

export function useGetUserByUsername(username: string) {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => getUserByUsername(username),
    });
}
