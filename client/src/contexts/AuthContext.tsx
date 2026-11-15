import type { User } from "../api/auth"
import { createContext, useState, type ReactNode } from "react"

type AuthContextType = {
    user: User | null;
    setUser: (nextUser: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}