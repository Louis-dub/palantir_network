import type { User } from "../api/auth"
import { AuthContext } from "./useAuth";
import { useState, type ReactNode } from "react"

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
