import { useMutation } from "@tanstack/react-query";
import { register, type LoginResponse, type RegisterUser } from "../api/auth";
import { useAuth } from "../contexts/useAuth";

export default function useRegister() {
    const {setUser} = useAuth();

    return useMutation<LoginResponse, Error, RegisterUser>({
        mutationFn: register,
        onSuccess: (result) => {
            sessionStorage.setItem("token", result.token);
            setUser(result.user);
        }
    });
};