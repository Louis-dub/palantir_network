import type { User } from "../api/auth"
import { createContext, useContext, useState, type ReactNode } from "react"

type AuthContextType = {
    user: User | null;
    setUser: (nextUser: User | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext<AuthContextType | null>(AuthContext);

    if (!context)
        throw new Error("useAuth must be used within an AuthProvider.");
    return context;
}