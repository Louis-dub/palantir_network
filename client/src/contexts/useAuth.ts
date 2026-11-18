import { useContext, createContext } from "react"
import { type User } from "../api/auth";

export type AuthContextType = {
    user: User | null;
    setUser: (nextUser: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext<AuthContextType | null>(AuthContext);

    if (!context)
        throw new Error("useAuth must be used within an AuthProvider.");
    return context;
}