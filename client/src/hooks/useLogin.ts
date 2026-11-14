import { useMutation } from "@tanstack/react-query";
import { login, type LoginResponse } from "../api/auth";

export type LoginUser = {
    username: string;
    password: string;
}

export default function useLogin() {
    return useMutation<LoginResponse, Error, LoginUser>({
        mutationFn: login,
        onSuccess: (result) => {
            localStorage.setItem("token", JSON.stringify(result.token));
        }
    });
}