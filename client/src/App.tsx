import { useEffect, useState } from "react";
import { Header, type UserState } from "./components/Header";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./contexts/useAuth";
import RegisterForm from "./components/RegisterForm";
import CreatePost from "./components/CreatePost";
import { PostsAll, PostsByUsername } from "./components/PostsFeed";
import { type User } from "./api/auth";

export default function App() {
    const {user} = useAuth();
    const [userSearch, setUserSearch] = useState<User | undefined>(undefined);
    const [userState, setUserState] = useState<UserState>({isLoading: false, error: null});
    
    const [form, setForm] = useState<"login" | "register">("login");

    useEffect(() => {
        document.documentElement.dataset.theme = user?.race.toLocaleLowerCase() || "general";
    }, [user]);

    return (
        <>
            {user
                ? (<>
                       <Header
                           setUser={setUserSearch}
                           setUserState={setUserState}
                       />
                       <main>
                           {!userSearch ? (
                               <>
                                   <PostsAll />
                                   <CreatePost />
                               </>
                           ) : userState.isLoading ? (
                               <p className="border rounded-lg p-4 bg-[var(--common-card)] border-[var(--common-border)] text-[var(--common-text-secondary)]">
                                   Loading...
                               </p>
                           ) : userState.error ? (
                               <p className="border rounded-lg p-4 bg-[var(--common-card)] border-[var(--common-border)] text-[var(--common-text-secondary)]">
                                   The Palantír does not recognise this child of Arda.
                               </p>
                           ) : <PostsByUsername userId={userSearch.id} />}
                       </main>
                   </>)
                : form === "login"
                ? <LoginForm onShowRegister={() => setForm("register")} />
                : <RegisterForm onShowLogin={() => setForm("login")} />}
        </>
    )
}
