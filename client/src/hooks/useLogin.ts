import { useMutation } from "@tanstack/react-query";
import { login, type LoginResponse, type LoginUser } from "../api/auth";

export default function useLogin() {
    return useMutation<LoginResponse, Error, LoginUser>({
        mutationFn: login,
        onSuccess: (result) => {
            localStorage.setItem("token", JSON.stringify(result.token));
        }
    });
}