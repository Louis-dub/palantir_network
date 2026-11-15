import { useMutation } from "@tanstack/react-query";
import { login, type LoginResponse, type LoginUser } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";

export default function useLogin() {
    const {setUser} = useAuth();

    return useMutation<LoginResponse, Error, LoginUser>({
        mutationFn: login,
        onSuccess: (result) => {
            sessionStorage.setItem("token", result.token);
            setUser(result.user);
        }
    });
};